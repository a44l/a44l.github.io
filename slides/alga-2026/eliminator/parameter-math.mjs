import {Fraction} from './math.mjs';

// Coeficientes por ordem crescente. Toda a aritmética é exata.
export function polynomial(values) {
  const result = (Array.isArray(values) ? values : [values]).map(Fraction.from);
  while (result.length > 1 && result[result.length - 1].isZero) result.pop();
  return result.length ? result : [Fraction.from(0)];
}
export const zeroPolynomial = p => p.length === 1 && p[0].isZero;
export const addPolynomial = (p, q) => polynomial(Array.from({length: Math.max(p.length, q.length)}, (_, i) => (p[i] || Fraction.from(0)).add(q[i] || 0)));
export const negatePolynomial = p => p.map(value => value.neg());
export function multiplyPolynomial(p, q) {
  const result = Array.from({length: p.length + q.length - 1}, () => Fraction.from(0));
  p.forEach((v, i) => q.forEach((w, j) => { result[i + j] = result[i + j].add(v.mul(w)); }));
  return polynomial(result);
}
export function dividePolynomial(p, q) {
  if (zeroPolynomial(q)) throw new Error('Divisão por zero.');
  let remainder = p.slice();
  const quotient = Array.from({length: Math.max(1, p.length - q.length + 1)}, () => Fraction.from(0));
  while (!zeroPolynomial(remainder) && remainder.length >= q.length) {
    const degree = remainder.length - q.length;
    const factor = remainder[remainder.length - 1].mul(q[q.length - 1].inverse());
    quotient[degree] = quotient[degree].add(factor);
    const term = Array.from({length: degree}, () => Fraction.from(0)).concat(q.map(value => value.mul(factor).neg()));
    remainder = addPolynomial(remainder, term);
  }
  return {quotient: polynomial(quotient), remainder};
}
function monic(p) { return zeroPolynomial(p) ? p : polynomial(p.map(value => value.mul(p[p.length - 1].inverse()))); }
export function gcdPolynomial(p, q) {
  while (!zeroPolynomial(q)) { const rest = dividePolynomial(p, q).remainder; p = q; q = rest; }
  return monic(p);
}
export function evaluatePolynomial(p, a) {
  return p.slice().reverse().reduce((value, coefficient) => value.mul(a).add(coefficient), Fraction.from(0));
}

export class ParameterFraction {
  constructor(numerator, denominator = [1]) {
    let n = polynomial(numerator), d = polynomial(denominator);
    if (zeroPolynomial(d)) throw new Error('Denominador nulo.');
    const divisor = gcdPolynomial(n, d);
    n = dividePolynomial(n, divisor).quotient;
    d = dividePolynomial(d, divisor).quotient;
    const scale = d[d.length - 1].inverse();
    this.n = n.map(value => value.mul(scale));
    this.d = d.map(value => value.mul(scale));
  }
  static from(value) { return value instanceof ParameterFraction ? value : new ParameterFraction(Array.isArray(value) ? value : [value]); }
  add(value) { const b = ParameterFraction.from(value); return new ParameterFraction(addPolynomial(multiplyPolynomial(this.n, b.d), multiplyPolynomial(b.n, this.d)), multiplyPolynomial(this.d, b.d)); }
  mul(value) { const b = ParameterFraction.from(value); return new ParameterFraction(multiplyPolynomial(this.n, b.n), multiplyPolynomial(this.d, b.d)); }
  neg() { return new ParameterFraction(negatePolynomial(this.n), this.d); }
  inverse() { return new ParameterFraction(this.d, this.n); }
  equals(value) { return this.add(ParameterFraction.from(value).neg()).isZero; }
  get isZero() { return zeroPolynomial(this.n); }
  evaluate(a) { return evaluatePolynomial(this.n, a).mul(evaluatePolynomial(this.d, a).inverse()); }
  toString() {
    const format = p => p.map((value, i) => value.isZero ? '' : `${value.toString()}${i ? `*a${i > 1 ? `^${i}` : ''}` : ''}`).filter(Boolean).join('+').replace(/\+\-/g, '-') || '0';
    return this.d.length === 1 && this.d[0].equals(1) ? format(this.n) : `(${format(this.n)})/(${format(this.d)})`;
  }
  toJSON() { return {n: this.n.map(String), d: this.d.map(String)}; }
}

// Pequena gramática de polinómios, sem eval. Só se pode dividir por constantes:
// cancelar a/a não torna essa expressão definida em a=0.
export function parseParameterPolynomial(input) {
  const source = String(input).replace(/−/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/²/g, '^2').replace(/³/g, '^3');
  if (source.length > 128) throw new Error('A expressão é demasiado longa.');
  const tokens = source.match(/\d+|a|[+*/^()\-]|\S/g) || [];
  if (tokens.length > 100 || tokens.some(token => !/^(?:\d{1,12}|a|[+*/^()\-])$/.test(token))) throw new Error('Usa apenas números, a, parênteses e operações aritméticas.');
  let cursor = 0, depth = 0;
  const incomplete = message => { const error = new Error(message); error.incomplete = true; return error; };
  const bounded = value => { if (value.n.length > 9) throw new Error('Simplifica a expressão antes de a introduzir.'); return value; };
  function atom() {
    const token = tokens[cursor++];
    if (token === undefined) throw incomplete('Completa a expressão.');
    if (token === '(') {
      if (++depth > 16) throw new Error('Há demasiados parênteses.');
      const value = sum();
      if (tokens[cursor] !== ')') {
        if (tokens[cursor] === undefined) throw incomplete('Fecha os parênteses.');
        throw new Error('Revê os parênteses.');
      }
      cursor++; depth--; return value;
    }
    if (token === 'a') return new ParameterFraction([0, 1]);
    if (/^\d+$/.test(token)) return ParameterFraction.from(token);
    throw new Error('Falta um número, a ou um parêntese.');
  }
  function power() {
    let value = atom();
    if (tokens[cursor] === '^') {
      cursor++;
      if (tokens[cursor] === undefined) throw incomplete('Completa o expoente.');
      const exponent = tokens[cursor++];
      if (!/^[0-4]$/.test(exponent)) throw new Error('Usa um expoente inteiro entre 0 e 4.');
      const base = value; value = ParameterFraction.from(1);
      for (let i = 0; i < Number(exponent); i++) value = bounded(value.mul(base));
    }
    return value;
  }
  function unary() {
    if (tokens[cursor] === '+' || tokens[cursor] === '-') { const sign = tokens[cursor++]; const value = unary(); return sign === '-' ? value.neg() : value; }
    return power();
  }
  function product() {
    let value = unary();
    while (tokens[cursor] === '*' || tokens[cursor] === '/' || tokens[cursor] === 'a' || tokens[cursor] === '(') {
      const operator = ['*', '/'].includes(tokens[cursor]) ? tokens[cursor++] : '*';
      const right = unary();
      if (operator === '/' && right.n.length > 1) throw new Error('O denominador tem de ser uma constante não nula, para a expressão estar definida para todo a.');
      value = bounded(value.mul(operator === '/' ? right.inverse() : right));
    }
    return value;
  }
  function sum() {
    let value = product();
    while (tokens[cursor] === '+' || tokens[cursor] === '-') { const operator = tokens[cursor++], right = product(); value = bounded(value.add(operator === '-' ? right.neg() : right)); }
    return value;
  }
  const result = sum();
  if (cursor !== tokens.length) throw new Error('Revê as operações e os parênteses.');
  if (result.n.length > 3) throw new Error('Neste campo, o polinómio deve ter grau no máximo 2.');
  return result;
}
export const parameterMatrix = matrix => matrix.map(row => row.map(ParameterFraction.from));
export function parameterOperation(matrix, operation) {
  const result = matrix.map(row => row.slice());
  if (operation.type === 'swap') [result[operation.target], result[operation.source]] = [result[operation.source], result[operation.target]];
  else result[operation.target] = matrix[operation.target].map((value, j) => operation.type === 'scale' ? value.mul(operation.factor) : value.add(matrix[operation.source][j].mul(operation.factor)));
  return result;
}

// Mesma ordem das demonstrações numéricas: pivôs da esquerda para a direita,
// normalização, depois eliminação de cima para baixo.
export function parameterHint(matrix) {
  let row = 0;
  for (let column = 0; column < matrix[0].length && row < matrix.length; column++) {
    let pivot = row;
    while (pivot < matrix.length && matrix[pivot][column].isZero) pivot++;
    if (pivot === matrix.length) continue;
    if (pivot !== row) return {operation: {type: 'swap', target: row, source: pivot}, pivot: {row: pivot, column}, target: {row, column}};
    if (!matrix[row][column].equals(1)) return {operation: {type: 'scale', target: row, factor: matrix[row][column].inverse()}, pivot: {row, column}, target: null};
    for (let other = 0; other < matrix.length; other++) if (other !== row && !matrix[other][column].isZero) return {operation: {type: 'add', target: other, source: row, factor: matrix[other][column].neg()}, pivot: {row, column}, target: {row: other, column}};
    row++;
  }
  return null;
}
export function parameterReduction(matrix) {
  let current = parameterMatrix(matrix);
  const frames = [{matrix: current, operation: null}];
  for (let i = 0; i < 150; i++) {
    const hint = parameterHint(current);
    if (!hint) return frames;
    current = parameterOperation(current, hint.operation);
    frames.push({matrix: current, operation: hint.operation});
  }
  throw new Error('Redução demasiado longa.');
}
