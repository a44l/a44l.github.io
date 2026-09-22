'use strict';
const assert = require('assert');
const {cases, axioms, grade, restoreProgress} = require('../content.js');
let assertions = 0;
function check(label, condition) { assert.ok(condition, label); assertions++; }
function same(a,b) { return Array.isArray(a) ? Array.isArray(b) && a.length===b.length && a.every((x,i)=>same(x,b[i])) : typeof a==='number' && typeof b==='number' && Math.abs(a-b)<1e-8*Math.max(1,Math.abs(a),Math.abs(b)); }
const addV = (a,b)=>a.map((x,i)=>x+b[i]);
const negV = a=>a.map(x=>-x);
const scaleV = (a,v)=>v.map(x=>a*x);
const reals = [-2,-1,0,0.5,1,2,3];
const vectors = [[0,0],[1,0],[0,1],[1,1],[2,-1],[-1,-1],[0.5,1]];
const cAdd = (a,b)=>[a[0]+b[0],a[1]+b[1]];
const cMul = (a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const cConj = a=>[a[0],-a[1]];
const complexes = [[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[0.5,-2]];
const cVectors = [[[0,0],[0,0]],[[1,0],[0,0]],[[0,1],[0,0]],[[0,0],[1,0]],[[1,0],[1,0]],[[1,1],[0,-1]]];
const addCV = (u,v)=>u.map((z,i)=>cAdd(z,v[i]));
const zeroC = a=>same(a,[0,0]);
const realBase = {scalars:reals,scalarAdd:(a,b)=>a+b,scalarMul:(a,b)=>a*b,one:1,vs:reals,add:(u,v)=>u+v,scale:(a,u)=>a*u,zero:0,inverse:u=>-u};
const complexBase = {scalars:complexes,scalarAdd:cAdd,scalarMul:cMul,one:[1,0],vs:complexes,add:cAdd,scale:cMul,zero:[0,0],inverse:negV};
const models = {
  'r2':{...realBase,vs:vectors,add:addV,scale:scaleV,zero:[0,0],inverse:negV},
  'complex-real':{...realBase,vs:complexes,add:cAdd,scale:scaleV,zero:[0,0],inverse:negV},
  'positive':{...realBase,vs:[0.5,1,2,3],add:(u,v)=>u*v,scale:(a,u)=>Math.pow(u,a),zero:1,inverse:u=>1/u},
  'shifted':{...realBase,add:(u,v)=>u+v-3,scale:(a,u)=>3+a*(u-3),zero:3,inverse:u=>6-u},
  'mismatch':{...realBase,add:(u,v)=>u+v+1,zero:-1,inverse:u=>-u-2},
  'a1':{...realBase,vs:vectors,add:(u,v)=>scaleV(u[0]*v[1]===u[1]*v[0]?1:2,addV(u,v)),scale:scaleV,zero:[0,0],inverse:negV},
  'a2':{...realBase,add:Math.max,scale:(a,u)=>u,zero:null,inverse:null},
  'a3':{...realBase,vs:[0,1],add:Math.max,scale:(a,u)=>u,inverse:u=>0},
  'a5':{...complexBase,vs:cVectors,add:addCV,scale:(a,u)=>u.map(z=>cMul(zeroC(u[1])?a:cConj(a),z)),zero:[[0,0],[0,0]],inverse:u=>u.map(negV)},
  'a6':{...realBase,scale:(a,u)=>a*a*u},
  'a7':{...complexBase,scale:(a,u)=>scaleV(a[0],u)},
  'a8':{...realBase,scale:()=>0},
  'absolute':{...realBase,scale:(a,u)=>Math.abs(a)*u},
  'projection':{...realBase,vs:vectors,add:addV,scale:(a,u)=>[a*u[0],0],zero:[0,0],inverse:negV}
};
// Finite checks catch mistakes; universal proofs are supplied in the content and MATHEMATICS.md.
for(const [id,model] of Object.entries(models)) {
  const {vs,scalars,add,scale,zero,inverse,scalarAdd,scalarMul,one}=model;
  const observed=Array(8).fill(true);
  if(zero===null)observed[1]=observed[2]=false;
  for(const u of vs) {
    if(zero!==null) {
      observed[1] = observed[1] && same(add(u,zero),u) && same(add(zero,u),u);
      observed[2] = observed[2] && same(add(u,inverse(u)),zero) && same(add(inverse(u),u),zero);
    }
    observed[7]=observed[7]&&same(scale(one,u),u);
    for(const a of scalars)for(const b of scalars) {
      observed[5]=observed[5]&&same(scale(scalarAdd(a,b),u),add(scale(a,u),scale(b,u)));
      observed[6]=observed[6]&&same(scale(scalarMul(a,b),u),scale(a,scale(b,u)));
    }
    for(const v of vs) {
      observed[3]=observed[3]&&same(add(u,v),add(v,u));
      for(const a of scalars)observed[4]=observed[4]&&same(scale(a,add(u,v)),add(scale(a,u),scale(a,v)));
      for(const w of vs)observed[0]=observed[0]&&same(add(add(u,v),w),add(u,add(v,w)));
    }
  }
  assert.deepStrictEqual(observed,cases.find(c=>c.id===id).answers,`Independent model for ${id}`);
  assertions++;
}
// Explicit numerical witnesses used in student feedback.
const bent=models.a1.add;
check('A1 left witness (4,6)',same(bent(bent([1,0],[0,1]),[0,1]),[4,6]));
check('A1 right witness (2,4)',same(bent([1,0],bent([0,1],[0,1])),[2,4]));
for(const e of reals) check('A2 candidate neutral refuted at e−1',Math.max(e,e-1)!==e-1);
check('A3 no inverse of 1', [0,1].every(v=>Math.max(1,v)!==0));
check('A5 left witness',same(models.a5.scale([0,1],[[1,0],[1,0]]),[[0,-1],[0,-1]]));
check('A5 right witness',same(addCV(models.a5.scale([0,1],[[1,0],[0,0]]),models.a5.scale([0,1],[[0,0],[1,0]])),[[0,1],[0,-1]]));
check('A6 2 squared gives 4',models.a6.scale(2,1)===4);
check('A7 i squared gives −1',same(models.a7.scale(cMul([0,1],[0,1]),[1,0]),[-1,0]));
check('A7 successive i actions give 0',same(models.a7.scale([0,1],models.a7.scale([0,1],[1,0])),[0,0]));
check('A8 unit scalar fails',models.a8.scale(1,1)===0);
check('Projection unit scalar fails',same(models.projection.scale(1,[0,1]),[0,0]));

check('The bank has 24 exercises',cases.length===24);
check('The A4 exercise has been removed',!cases.some(c=>c.id==='a4'));
check('Exactly eight genuine single-failure examples',cases.filter(c=>c.genuine).length===8);
check('Lecture axiom order',axioms[1].name.includes('neutro')&&axioms[3].name.includes('Comutatividade'));
check('Unique IDs',new Set(cases.map(c=>c.id)).size===cases.length);
for(const example of cases) {
  check(`${example.id}: every claim has a worked explanation`,example.answers.length===example.explanations.length&&example.explanations.every(t=>t.includes('class="proof-steps"')&&t.includes('class="proof-result"')));
  check(`${example.id}: expected question count`,example.answers.length===(example.mode==='closure'?2:8));
  if(example.genuine) check(`${example.id}: only declared axiom fails`,example.answers.filter(v=>!v).length===1&&!example.answers[example.target-1]);
  for(let mask=0;mask<2**example.answers.length;mask++) {
    const answers=example.answers.map((_,i)=>!!(mask&(1<<i)));
    const expected=answers.filter((a,i)=>a!==example.answers[i]).length;
    const result=grade(example,answers);
    check(`${example.id}: grading mask ${mask}`,result.wrong.length===expected&&result.correct===answers.length-expected);
  }
}
// An unanswered property is distinct from an explicit negative answer.
const plane=cases.find(c=>c.id==='r2');
const blank=Array(8).fill(null);
let result=grade(plane,blank);
check('Unanswered properties are not marked wrong',result.wrong.length===0&&result.correct===0&&result.answered===0&&!result.complete);
check('All unanswered indices are retained',result.unanswered.length===8);
result=grade(plane,[true,false,null,null,null,null,null,null]);
check('A partial response evaluates exactly the two selected properties',result.answered===2&&result.correct===1&&result.wrong.length===1&&result.wrong[0]===1&&result.unanswered.length===6&&!result.complete);
result=grade(cases.find(c=>c.id==='a6'),[null,null,null,null,null,false,null,null]);
check('An explicit No can be correct without solving the remaining properties',result.correct===1&&result.answered===1&&result.wrong.length===0&&!result.complete);

// Existing learners keep confirmed answers; unchecked legacy boxes do not become new No claims.
const legacy={version:1,current:'a4',work:{
  r2:{selected:[true,false,false,false,false,false,false,false],checked:false},
  a6:{selected:[true,true,true,true,true,false,true,true],checked:true,solved:true},
  a8:{selected:[true,true,true,true,true,true,true,false],revealed:true,solved:false},
  a4:{selected:Array(8).fill(true),checked:true,solved:true}
}};
const migrated=restoreProgress(legacy);
check('Removed A4 progress is ignored and current selection falls back safely',migrated.current==='r2'&&!migrated.work.a4);
check('A legacy unchecked box becomes unanswered',migrated.work.r2.selected[0]===true&&migrated.work.r2.selected.slice(1).every(v=>v===null));
check('Verified legacy No responses and completion survive migration',migrated.work.a6.selected[5]===false&&migrated.work.a6.solved);
check('Consulting a legacy solution does not earn completion',migrated.work.a8.revealed&&!migrated.work.a8.solved);
const restored=restoreProgress({version:2,current:'r2',work:{r2:{selected:[false,true,null,null,null,null,null,null]}}});
check('Version 2 distinguishes Yes, No and unanswered after reload',restored.work.r2.selected[0]===false&&restored.work.r2.selected[1]===true&&restored.work.r2.selected[2]===null&&!restored.work.r2.solved);
check('Invalid stored data has a safe default',restoreProgress({version:2,work:{r2:{selected:[true]}}}).work.r2===undefined&&restoreProgress(null).current==='r2');
const published=JSON.stringify(cases);
check('Abstract addition consistently uses #',!published.includes('⊕')&&axioms[0].formula.includes('#'));
check('No student explanation requires determinants or matrix multiplication',!/det\(|determinante|multiplicação de matrizes/i.test(published));
const a5=cases.find(c=>c.id==='a5');
check('Conjugation uses actual overlines throughout A5',a5.scalar.includes('class="overline"')&&a5.explanations[5].includes('class="overline"')&&!/[\u0304\u0305]/.test(JSON.stringify(a5)));
// Closure witnesses are independent of the stored answer flags.
const upper=v=>v[1]>=0;
check('Half-plane addition stays inside',upper(addV([1,2],[-5,0])));
check('Half-plane negative scalar escapes',!upper(scaleV(-1,[0,1])));
const circle=v=>same(v[0]**2+v[1]**2,1);
check('Circle addition escapes',!circle(addV([1,0],[1,0])));
check('Circle zero scalar escapes',!circle(scaleV(0,[1,0])));
check('Integer pairs fail real scalar closure',!scaleV(0.5,[1,0]).every(Number.isInteger));
check('Exact quadratic cancellation loses degree',addV([0,0,1],[0,0,-1])[2]===0);
check('Exact quadratic zero scalar loses degree',scaleV(0,[0,0,1])[2]===0);
console.log(`Passed ${assertions} checks, including independent models for ${Object.keys(models).length} structures, all Yes/No combinations, partial responses and progress migration.`);
