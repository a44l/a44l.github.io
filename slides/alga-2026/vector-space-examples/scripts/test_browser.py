"""Browser checks using Chromium's DevTools protocol (requires websocket-client).

Start the site on port 8010 and a disposable Chromium on debug port 9270.
The script creates its own tab and resets only this site's practice storage.
"""
import base64
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

import websocket

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'verification'
OUTPUT.mkdir(exist_ok=True)
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8010/'
DEBUG = sys.argv[2] if len(sys.argv) > 2 else 'http://127.0.0.1:9270'
KEY = 'vetor.practice.v2'
request = urllib.request.Request(DEBUG + '/json/new?about:blank', method='PUT')
page = json.load(urllib.request.urlopen(request))
ws = websocket.create_connection(page['webSocketDebuggerUrl'], origin=DEBUG, timeout=15)
sequence = 0
errors = []
checks = []


def command(method, params=None):
    global sequence
    sequence += 1
    ws.send(json.dumps({'id': sequence, 'method': method, 'params': params or {}}))
    while True:
        message = json.loads(ws.recv())
        if message.get('method') == 'Runtime.exceptionThrown':
            errors.append(message['params']['exceptionDetails'])
        if message.get('id') == sequence:
            if 'error' in message:
                raise RuntimeError(message['error'])
            return message.get('result', {})


def evaluate(expression):
    result = command('Runtime.evaluate', {'expression': expression, 'returnByValue': True, 'awaitPromise': True})
    if 'exceptionDetails' in result:
        raise RuntimeError(result['exceptionDetails'])
    return result['result'].get('value')


def wait_for(expression):
    deadline = time.monotonic() + 10
    while time.monotonic() < deadline:
        if evaluate(expression):
            return
        time.sleep(.05)
    raise AssertionError('Timed out: ' + expression)


def click(selector):
    evaluate(f'document.querySelector({json.dumps(selector)}).click()')


def fill(selector, value):
    evaluate(f'(() => {{ const e = document.querySelector({json.dumps(selector)}); e.value = {json.dumps(value)}; e.dispatchEvent(new Event("input", {{bubbles:true}})); }})()')


def check(name, condition):
    assert condition, name
    checks.append(name)
    print('✓ ' + name, flush=True)


def go(case_id):
    evaluate(f'location.hash = {json.dumps(case_id)}')
    wait_for(f'document.querySelector("#exercise-title").textContent === VectorLab.cases.find(c => c.id === {json.dumps(case_id)}).title')


def set_answers(values):
    evaluate(f'({json.dumps(values)}).forEach((v,i) => {{document.querySelector("#claim-"+i+"-"+(v?"yes":"no")).click();}})')


def viewport(width, height):
    command('Emulation.setDeviceMetricsOverride', {'width': width, 'height': height, 'deviceScaleFactor': 1, 'mobile': False})


def screenshot(name, full=False):
    evaluate('document.fonts.ready')
    evaluate('new Promise(resolve => setTimeout(resolve, 200))')
    options = {'format': 'png', 'captureBeyondViewport': full}
    if full:
        size = command('Page.getLayoutMetrics')['cssContentSize']
        options['clip'] = {'x': 0, 'y': 0, 'width': size['width'], 'height': size['height'], 'scale': 1}
    data = command('Page.captureScreenshot', options)['data']
    (OUTPUT / name).write_bytes(base64.b64decode(data))


def reload_page(condition='true'):
    evaluate('window.__oldDocument = true')
    command('Page.reload')
    wait_for('!window.__oldDocument && document.readyState === "complete" && !!document.querySelector("#claim-7-yes") && (' + condition + ')')


def clear_progress():
    evaluate(f'localStorage.removeItem({json.dumps(KEY)}); localStorage.removeItem("vetor.practice.v1"); history.replaceState(null, "", "#r2");')
    reload_page('document.querySelector("#progress-count").textContent === "0 / 24"')


command('Runtime.enable')
command('Page.enable')
viewport(1440, 1080)
command('Page.navigate', {'url': BASE})
wait_for('document.readyState === "complete" && !!document.querySelector("#claim-7-yes")')
clear_progress()
check('Each of eight properties starts with two unselected Yes/No buttons', evaluate('document.documentElement.lang === "pt-PT" && document.querySelectorAll("[data-claim]").length === 16 && !document.querySelector("[data-claim][aria-pressed=true]") && !document.querySelector("input[type=checkbox]")'))
check('Unanswered properties are neither negative claims nor errors', evaluate('document.querySelectorAll(".row-feedback:not([hidden])").length === 0 && !document.querySelector(".is-wrong") && document.querySelector("#claim-progress").textContent === "0 de 8 respondidas"'))
check('Local font loaded', evaluate('document.fonts.ready.then(() => document.fonts.check("14px Inter"))'))
screenshot('desktop.png', True)
evaluate('document.querySelector("#claim-0-no").focus()')
click('#claim-0-no')
check('One wrong click immediately opens only that property’s worked explanation', evaluate('document.querySelectorAll(".row-feedback:not([hidden])").length === 1 && document.querySelectorAll("[data-row]")[0].classList.contains("is-wrong") && document.querySelector("#feedback-0 .row-details").open && document.querySelectorAll("#feedback-0 .proof-steps li").length >= 3 && document.querySelectorAll("#feedback-0 .calculation-line").length >= 4'))
check('Answering keeps keyboard focus and associates buttons with their feedback', evaluate('document.activeElement.id === "claim-0-no" && document.querySelector("#claim-0-no").getAttribute("aria-controls") === "feedback-0" && document.querySelector("#announcer").textContent.includes("não está correta")'))
check('One answer leaves seven properties ungraded', evaluate('document.querySelector("#claim-progress").textContent === "1 de 8 respondidas" && document.querySelector("#feedback-summary").hidden && document.querySelector("#progress-count").textContent === "0 / 24"'))
click('#claim-0-yes')
check('Correcting one answer updates it immediately and retains the full proof', evaluate('!document.querySelector(".is-wrong") && document.querySelector("#claim-0-yes").getAttribute("aria-pressed") === "true" && document.querySelector("#claim-0-no").getAttribute("aria-pressed") === "false" && document.querySelector("#feedback-0 .row-details").open && document.querySelector("#feedback-0").textContent.includes("Correto" )'))
click('#claim-1-no')
reload_page()
check('Yes, No, unanswered and open explanations persist across reload', evaluate('document.querySelectorAll("[data-claim][aria-pressed=true]").length === 2 && document.querySelector("#claim-0-yes").getAttribute("aria-pressed") === "true" && document.querySelector("#claim-1-no").getAttribute("aria-pressed") === "true" && document.querySelector("#feedback-2").hidden && document.querySelectorAll(".row-details[open]").length === 2'))
set_answers([True] * 8)
check('Eight correct individual answers complete the exercise automatically', evaluate('!document.querySelector("#solution-panel").hidden && document.querySelector("#solution-panel").textContent.includes("Sim, é um espaço vetorial") && document.querySelector("#progress-count").textContent === "1 / 24"'))

go('a6')
check('The axiom route has nine challenges and no A4 example', evaluate('document.querySelectorAll(".example-item").length === 9 && !VectorLab.cases.some(c=>c.id === "a4") && !document.querySelector("[data-case=a4]")'))
click('#hint')
check('A hint leaves all answers unselected', evaluate('!document.querySelector("#hint-box").hidden && !document.querySelector("[data-claim][aria-pressed=true]")'))
click('#reveal')
check('Revealing shows every explanation without earning progress', evaluate('document.querySelectorAll("[data-claim]:disabled").length === 16 && document.querySelectorAll(".row-details[open]").length === 8 && document.querySelector("#progress-count").textContent === "1 / 24" && document.querySelector("#feedback-summary").textContent.includes("Resolução consultada")'))
click('[data-try-again]')
check('Retry clears all revealed answers', evaluate('!document.querySelector("[data-claim][aria-pressed=true]") && !document.querySelector("[data-claim]:disabled") && !document.querySelector(".row-details")'))
click('#claim-5-yes')
check('A wrong A6 claim immediately supplies the worked 4 versus 2 counterexample', evaluate('document.querySelector("#feedback-5").textContent.includes("4 ≠ 2") && document.querySelectorAll(".is-wrong").length === 1 && document.querySelector("#feedback-5 .row-details").open'))
evaluate('document.querySelectorAll("[data-row]")[5].scrollIntoView({block:"start"})')
screenshot('feedback.png')
click('#claim-5-no')
check('A correct No is evaluated independently of seven unanswered properties', evaluate('document.querySelector("#claim-progress").textContent === "1 de 8 respondidas" && document.querySelector("#correct-count").textContent === "1 correta" && document.querySelector("#feedback-summary").hidden'))
set_answers([True,True,True,True,True,False,True,True])
check('Correct classification of a non-example earns progress', evaluate('document.querySelector("#progress-count").textContent === "2 / 24" && document.querySelector("#solution-panel").textContent.includes("Não é um espaço vetorial")'))

for case in evaluate('VectorLab.cases.map(c => ({id:c.id, answers:c.answers, mode:c.mode}))'):
    go(case['id'])
    click('#reset')
    set_answers([not x for x in case['answers']])
    check(case['id'] + ': all incorrect claims have immediate, expanded proofs', evaluate(f'document.querySelectorAll(".is-wrong").length === {len(case["answers"])} && document.querySelectorAll(".row-details[open] .proof-steps").length === {len(case["answers"])}'))
    set_answers(case['answers'])
    check(case['id'] + ': all correct claims retain their proofs and complete automatically', evaluate(f'!document.querySelector(".is-wrong") && !document.querySelector("#solution-panel").hidden && document.querySelectorAll(".row-details[open]").length === {len(case["answers"])}'))
    if case['mode'] == 'closure':
        check(case['id'] + ': failed closure stops before evaluating internal axioms', evaluate('document.querySelectorAll("[data-claim]").length === 4 && !!document.querySelector(".closure-stop")'))
check('All 24 completed exercises are tracked', evaluate('document.querySelector("#progress-count").textContent === "24 / 24"'))
check('All 168 property explanations use # without determinant prerequisites', evaluate('VectorLab.cases.reduce((n,c)=>n+c.explanations.length,0) === 168 && !/⊕|determinante|det\\(|multiplicação de matrizes/i.test(JSON.stringify(VectorLab.cases))'))
click('#guide-open')
check('The guide describes immediate Yes/No feedback', evaluate('document.querySelector("#guide-dialog").open && document.querySelector("#guide-dialog").textContent.includes("dois botões")'))
command('Input.dispatchKeyEvent', {'type':'keyDown','key':'Escape','code':'Escape','windowsVirtualKeyCode':27})
command('Input.dispatchKeyEvent', {'type':'keyUp','key':'Escape','code':'Escape','windowsVirtualKeyCode':27})
wait_for('!document.querySelector("#guide-dialog").open && document.activeElement.id === "guide-open"')
check('Escape closes the dialog and returns focus', evaluate('document.activeElement.id === "guide-open"'))
click('#axioms-open')
check('The reference keeps all eight axioms and explains the dependence of A4', evaluate('document.querySelector("#axioms-dialog").open && document.querySelectorAll(".reference-row").length === 8 && !!document.querySelector("#commutativity-proof .proof-steps") && document.querySelector("#commutativity-proof").textContent.includes("A4")'))
click('#axioms-dialog [data-close-dialog]')
go('r2')
fill('#search', 'polinomios')
check('Search ignores accents', evaluate('document.querySelectorAll(".example-item").length === 1 && document.querySelector(".example-item").dataset.case === "polynomials"'))
fill('#search', 'not-a-case')
check('An empty search has an explanation', evaluate('!document.querySelector("#empty-search").hidden'))
fill('#search', '')
click('#unsolved')
check('The unsolved filter excludes completed exercises', evaluate('!document.querySelector(".example-item")'))
click('#unsolved')
go('waves')
before = evaluate('document.querySelector("#wave-sum path").getAttribute("d")')
fill('#wave-amplitude', '-2')
check('Wave exploration changes the plotted sum', evaluate('document.querySelector("#wave-sum path").getAttribute("d")') != before)
go('a5')
check('A5 uses true overlines in definitions, proofs and the diagram', evaluate('Array.from(document.querySelectorAll("#exercise .overline")).length > 10 && Array.from(document.querySelectorAll("#exercise .overline")).every(e=>getComputedStyle(e).textDecorationLine === "overline") && getComputedStyle(document.querySelector(".diagram-panel tspan")).textDecorationLine === "overline" && !/[\\u0304\\u0305]/.test(document.querySelector("#exercise").textContent)'))
click('#reset')
for width in (1440, 1024, 768, 393, 320):
    viewport(width, 940)
    evaluate('window.scrollTo(0,0)')
    check(f'Page and answer buttons fit at {width}px', evaluate('document.documentElement.scrollWidth <= innerWidth && Array.from(document.querySelectorAll(".axiom-card,.claim-choices,.operation")).every(e => e.scrollWidth <= e.clientWidth + 1)'))
    if width == 393:
        screenshot('mobile-challenge.png', True)

# Full-length explanations, including the longest case distinctions, must fit on a narrow phone.
for case_id in evaluate('VectorLab.cases.map(c=>c.id)'):
    go(case_id)
    click('#reveal')
    evaluate('document.querySelector(".case-footnote details") && (document.querySelector(".case-footnote details").open=true)')
    check(case_id + ': all expanded proofs fit at 320px', evaluate('document.documentElement.scrollWidth <= innerWidth && Array.from(document.querySelectorAll(".axiom-card,.operation,.calculation,.closure-proof")).every(e => e.scrollWidth <= e.clientWidth + 1)'))

# Inspect the conjugation definition at desktop size, as well as one full explanation.
viewport(1440, 1080)
go('a5')
click('#reset')
evaluate('document.querySelector(".case-card").scrollIntoView({block:"start"})')
screenshot('a5-overline.png')
click('#claim-5-yes')
evaluate('document.querySelectorAll("[data-row]")[5].scrollIntoView({block:"start"})')
screenshot('a5-proof.png')

# Keyboard activation uses the actual browser input path.
go('r2')
click('#reset')
evaluate('document.querySelector("#claim-0-yes").focus()')
command('Input.dispatchKeyEvent', {'type':'keyDown','key':' ','code':'Space','windowsVirtualKeyCode':32})
command('Input.dispatchKeyEvent', {'type':'keyUp','key':' ','code':'Space','windowsVirtualKeyCode':32})
check('Space selects a focused Yes button and opens its proof', evaluate('document.querySelector("#claim-0-yes").getAttribute("aria-pressed") === "true" && !document.querySelector("#feedback-0").hidden && document.activeElement.id === "claim-0-yes"'))
evaluate('document.querySelector("#claim-1-no").focus()')
command('Input.dispatchKeyEvent', {'type':'keyDown','key':'Enter','code':'Enter','windowsVirtualKeyCode':13,'text':'\r','unmodifiedText':'\r'})
command('Input.dispatchKeyEvent', {'type':'keyUp','key':'Enter','code':'Enter','windowsVirtualKeyCode':13})
check('Enter selects a focused No button with immediate correction', evaluate('document.querySelector("#claim-1-no").getAttribute("aria-pressed") === "true" && document.querySelectorAll("[data-row]")[1].classList.contains("is-wrong") && !document.querySelector("#feedback-1").hidden'))

# A plain file URL must work without modules, a build tool, or network requests.
command('Page.navigate', {'url': (ROOT/'index.html').as_uri()+'#a1'})
wait_for('!!document.querySelector("#claim-7-yes") && document.querySelector("#exercise-title").textContent === "Uma soma que se dobra"')
click('#reset')
click('#claim-0-yes')
check('Direct file opening runs individual grading and the product-only A1 proof', evaluate('document.querySelectorAll(".is-wrong").length === 1 && document.querySelector("#feedback-0").textContent.includes("(4,6)") && document.querySelector("#feedback-0").textContent.includes("(2,4)") && !document.querySelector("#feedback-0").textContent.includes("determinante")'))

# Browsers that deny local storage still support a complete exercise.
hook = command('Page.addScriptToEvaluateOnNewDocument', {'source': 'Storage.prototype.getItem = function(){throw new Error("Test: storage blocked")}; Storage.prototype.setItem = function(){throw new Error("Test: storage blocked")};'})['identifier']
command('Page.navigate', {'url': BASE+'#r2'})
wait_for('!!document.querySelector("#claim-7-yes") && document.querySelector("#save-status").textContent.includes("só enquanto")')
set_answers([True] * 8)
check('Practice works when storage is unavailable', evaluate('!document.querySelector("#solution-panel").hidden && document.querySelector("#progress-count").textContent === "1 / 24"'))
command('Page.removeScriptToEvaluateOnNewDocument', {'identifier': hook})
reload_page('!document.querySelector("#save-status").textContent.includes("só enquanto")')

# Previously saved work is migrated. A removed case cannot prevent page loading.
legacy={'version':1,'current':'a4','work':{
    'r2':{'selected':[True,False,False,False,False,False,False,False], 'checked':False},
    'a6':{'selected':[True,True,True,True,True,False,True,True], 'checked':True, 'solved':True},
    'a4':{'selected':[True]*8,'checked':True,'solved':True}
}}
evaluate(f'localStorage.removeItem({json.dumps(KEY)}); localStorage.setItem("vetor.practice.v1", {json.dumps(json.dumps(legacy))}); history.replaceState(null,"","#a4");')
reload_page('document.querySelector("#progress-count").textContent === "1 / 24"')
check('Legacy progress survives while A4 is removed and unchecked boxes stay unanswered', evaluate(f'document.querySelector("#exercise-title").textContent === "O plano real" && document.querySelectorAll("[data-claim][aria-pressed=true]").length === 1 && !document.querySelector(".is-wrong") && JSON.parse(localStorage.getItem({json.dumps(KEY)})).version === 2'))
go('a6')
check('A verified legacy No is retained with its explanation', evaluate('document.querySelector("#claim-5-no").getAttribute("aria-pressed") === "true" && document.querySelector("#feedback-5 .row-details").open && !document.querySelector("#solution-panel").hidden'))
check('Page resources are all local', evaluate('performance.getEntriesByType("resource").every(e=>new URL(e.name).origin === location.origin)'))

# End with a fresh exercise for a clean preview.
clear_progress()
viewport(393, 852)
evaluate('window.scrollTo(0,0)')
screenshot('mobile.png', True)
viewport(1440, 1080)
evaluate('window.scrollTo(0,0)')
screenshot('desktop.png', True)
check('No uncaught browser exceptions', not errors)
(OUTPUT/'browser-checks.json').write_text(json.dumps({'checks':checks,'errors':errors}, ensure_ascii=False, indent=2))
print(f'Passed {len(checks)} browser checks. Screenshots saved in {OUTPUT}.')
ws.close()
