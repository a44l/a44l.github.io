/* Run with Node.js; no dependencies or writes. Browser rendering is checked separately. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), assert = require("assert");
const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "js/live-exercises.js"), "utf8");
function segment(start, end) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert(a >= 0 && b > a, "Engine test extraction markers");
  return source.slice(a, b);
}
const sandbox = {window: {}, Uint32Array};
vm.createContext(sandbox);
vm.runInContext("const SESSION_SIZE=8;\n" +
  segment("  const randomIndex =", "  const showScreen =") +
  segment("  const normalizeAnswer =", "  const renderOptions =") +
  segment("  const isCorrect =", "  const revealOptionAnswer =") +
  "\nthis.engine={chooseSession,isCorrect,parseNumericAnswer};", sandbox);
const engine = sandbox.engine;
const baseline = JSON.parse(fs.readFileSync(path.join(root,"sources/week-3-baseline.json")));
const hash = x => require("crypto").createHash("sha256").update(x).digest("hex");
function load(lecture, locale) {
  const context = {window:{}};
  const file = path.join(root, locale === "pt" ? "pt/js" : "js", "exercises-lecture-"+lecture+".js");
  vm.runInNewContext(fs.readFileSync(file,"utf8"),context,{filename:file});
  return context.window["LECTURE_"+lecture+"_EXERCISE_BANK"];
}
function choose(n,k) {
  let v=1;
  for(let i=1;i<=k;i++)v=v*(n-i+1)/i;
  return v;
}
function binomialTail(n,p,lo,hi=n) {
  let sum=0;
  for(let k=lo;k<=hi;k++)sum+=choose(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k);
  return sum;
}
// Independently calculated numerical answers, not copied from the bank keys.
const numericExpected = {
 "lec05-002":(4+6+8+10)/4,
 "lec05-004":36/25,
 "lec05-006":9/(100*1*1),
 "lec05-007":Math.ceil(4/(.05*.5*.5)),
 "lec05-015":1,
 "lec05-017":.3,
 "lec05-023":.6827, // specified four-decimal normal area
 "lec05-024":Math.sqrt(64*9),
 "lec05-030":.6827,
 "lec05-036":binomialTail(4,.5,3),
 "lec06-004":[1,1,0,1,1].reduce((a,b)=>a+b)>=4?1:0,
 "lec06-007":Math.pow(.5,4),
 "lec06-008":1-Math.pow(.75,2),
 "lec06-009":Math.max(.01,.03,.02),
 "lec06-011":Math.pow(.5,5),
 "lec06-020":binomialTail(5,.5,4),
 "lec06-026":[[2,5],[4,3],[1,7],[8,10]].filter(pair=>pair[1]>pair[0]).length,
 "lec06-030":binomialTail(4,.5,4),
 "lec06-031":binomialTail(6,.5,0,1)+binomialTail(6,.5,5),
 "lec06-032":binomialTail(6,.5,0),
 "lec06-038":2*.0287,
 "lec06-040":Math.max(.02,.12),
};
let questions=0, sessions=0, subsets=0;
for (const lecture of [5,6]) {
 const en = load(lecture,"en"), pt = load(lecture,"pt");
 for (const [locale,bank] of [["en",en],["pt",pt]]) {
  assert.strictEqual(bank.exercises.length,40);
  assert.strictEqual(bank.block.id,"lecture-"+lecture);
  assert.strictEqual(bank.block.sessionSize,8);
  assert(!bank.block.provisional && !bank.block.provisionalNote, "No provisional status is displayed");
  const page=fs.readFileSync(path.join(root,locale==="pt"?"pt/index.html":"index.html"),"utf8");
  assert(!/provisional|provisório/i.test(page), "No provisional labels in the selector");
  assert.strictEqual(new Set(bank.exercises.map(q=>q.id)).size,40);
  const counts = {intro:0,core:0,challenge:0};
  const deck = baseline.decks[locale];
  const renderedFile = path.join(root,locale==="en"?"":"pt",bank.sourceCatalog["week-3-slides"].url);
  const html = fs.readFileSync(renderedFile,"utf8");
  assert.strictEqual(hash(Buffer.from(html)),deck.renderedSha256,"Reference snapshot unchanged");
  for (const q of bank.exercises) {
   questions++;
   assert(q.id.startsWith("lec0"+lecture+"-"));
   counts[q.difficulty]++;
   assert(q.prompt && q.explanation && q.sources.length);
   assert(q.acceptedAnswers.includes(q.correctAnswer));
   assert(engine.isCorrect(q,q.correctAnswer),q.id+" accepts its key");
   if(q.type==="proof-step") {
    assert.strictEqual(q.context.length,2,q.id+" theorem and prior proof");
    assert(q.context.every(c=>c.text && c.label));
   } else assert(!q.context,q.id+" no unnecessary notation block");
   const texts=[q.prompt,q.explanation,q.answerDisplay||""]
    .concat((q.options||[]).map(x=>x.text),(q.context||[]).map(x=>x.text));
   for(const text of texts){
    for(const pair of [["\\(","\\)"],["\\[","\\]"]]){
     assert.strictEqual(text.split(pair[0]).length,text.split(pair[1]).length,q.id+" balanced TeX delimiters");
    }
    assert(typeof text === "string" && !text.includes("[object Object]"),q.id+" complete text");
   }
   if(q.visual) {
    for(const k of ["title","description","caption"])assert.strictEqual(typeof q.visual[k],"string");
    if(q.visual.kind==="normal")assert(q.visual.sd>0 && q.visual.shadeFrom<q.visual.shadeTo);
   }
   for(const ref of q.sources) {
    const record=deck.slides.find(x=>x.key===ref.sourceKey);
    assert(record && record.slide===ref.slide && record.anchor===ref.anchor,q.id+" source metadata");
    assert(html.includes('id="'+ref.anchor+'"'),q.id+" anchor exists");
    assert(lecture===5?ref.slide>=2&&ref.slide<=21:ref.slide>=22&&ref.slide<=49,q.id+" lecture scope");
   }
   assert.deepStrictEqual(JSON.parse(JSON.stringify(q.sources.map(x=>x.sourceKey))),baseline.questionSources[locale][q.id]);
   if(q.type==="numeric-input"){
    const wanted=numericExpected[q.id];
    assert(Number.isFinite(wanted),q.id+" independently calculated answer exists");
    assert(Math.abs(engine.parseNumericAnswer(q.correctAnswer)-wanted)<1e-9,q.id+" correct arithmetic");
    assert(engine.isCorrect(q,String(wanted)),q.id+" decimal accepted");
    assert(engine.isCorrect(q,String(wanted).replace(".",",")),q.id+" decimal comma accepted");
    assert(!engine.isCorrect(q,String(wanted+1)),q.id+" wrong answer rejected");
    assert(!engine.isCorrect(q,"not a number"),q.id+" invalid input rejected");
    if(q.integerAnswer)assert(!engine.isCorrect(q,String(wanted+.0000001)),q.id+" integer enforced");
   }else{
    assert.strictEqual(new Set(q.options.map(x=>x.id)).size,q.options.length);
    if(q.type==="multiple-select"){
     for(let mask=0;mask<(1<<q.options.length);mask++){
      const selected=q.options.filter((_,i)=>mask&(1<<i)).map(x=>x.id);
      const expected=selected.slice().sort().join(",")===q.correctAnswers.slice().sort().join(",");
      assert.strictEqual(engine.isCorrect(q,selected.join(",")),expected,q.id+" every checkbox combination");
      subsets++;
     }
    }else for(const option of q.options)
      assert.strictEqual(engine.isCorrect(q,option.id),option.id===q.correctAnswer,q.id+" choice grading");
   }
  }
  assert.deepStrictEqual(counts,{intro:10,core:20,challenge:10});
  for(let i=0;i<2500;i++) {
   const session=engine.chooseSession(bank.exercises);
   assert.strictEqual(session.length,8);
   assert.strictEqual(new Set(session.map(q=>q.id)).size,8);
   const diff={intro:0,core:0,challenge:0},topics={};
   for(const q of session) {diff[q.difficulty]++;topics[q.topic]=(topics[q.topic]||0)+1;}
   assert.deepStrictEqual(diff,{intro:2,core:4,challenge:2});
   assert(Object.values(topics).every(n=>n<=2));
   assert(session.filter(q=>q.type==="numeric-input").length<=4);
   sessions++;
  }
 }
 for(let i=0;i<40;i++){
  const a=en.exercises[i],b=pt.exercises[i];
  for(const key of ["id","type","difficulty","correctAnswer","correctAnswers","acceptedAnswers","integerAnswer"])
   assert.strictEqual(JSON.stringify(a[key]),JSON.stringify(b[key]),a.id+" translation parity: "+key);
  assert.strictEqual(JSON.stringify((a.options||[]).map(x=>x.id)),JSON.stringify((b.options||[]).map(x=>x.id)));
  // Mathematical expressions must match across the translations, excluding prose.
  const math=q=>[q.prompt,q.explanation].concat((q.options||[]).map(x=>x.text),(q.context||[]).map(x=>x.text))
   .flatMap(text=>Array.from(text.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g),m=>m[1]||m[2]))
   .map(x=>x.replace(/\\text\{[^}]*\}/g,"").replace(/\s+/g,"")).sort();
  assert.strictEqual(JSON.stringify(math(a)),JSON.stringify(math(b)),a.id+" identical mathematics in translation");
 }
}
console.log("PASS:",questions,"localized questions;",sessions,"balanced random sessions;",subsets,"checkbox combinations; all numerical answers and source links.");
