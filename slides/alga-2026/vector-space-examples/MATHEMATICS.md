# Mathematical audit

The exercise bank follows the supplied lecture notes, page 14. Scalars are in the explicitly stated field, either **ℝ** or **ℂ**. The empty set is never used. Closure is a prerequisite, separate from the eight numbered axioms:

1. Associativity of vector addition.
2. Existence of a two-sided additive identity.
3. Two-sided additive inverses relative to that identity.
4. Commutativity of vector addition.
5. Scalar multiplication distributes over vector addition.
6. Scalar multiplication distributes over scalar addition.
7. Compatibility with multiplication of scalars.
8. The scalar 1 acts as the identity.

## Why eight independent target axioms cannot be covered

**A4 follows from other axioms.** Expand `(1 + 1) ⊙ (u # v)` first using A6, then using A5. With A8, this gives

```
(u # v) # (u # v) = (u # u) # (v # v).
```

Use A1 to regroup, cancel the leftmost `u`, and cancel the rightmost `v`, using A2 and A3. What remains is `v # u = u # v`. No commutativity was assumed in cancellation, and A7 is not needed. Thus an example failing only A4 cannot exist. See also Jonathan Wise's university worksheet, [The vector space axioms, Theorem 8](https://math.colorado.edu/~jonathan.wise/teaching/math3135-spring-2017/exp01.pdf), for a related redundancy result (its numbering differs).

**A3 refers to the identity introduced in A2.** Under the actual wording in the supplied notes, A3 is a statement about inverses *relative to the additive identity*, so absence of an identity also precludes satisfying A3 in that sense. Interpreting the `0_E` of A3 as an arbitrary distinguished element would change the exercise's definition. The site explicitly states its convention and does not claim a universal independence result for every possible formalization of “zero”.

For broader context, A. J. van der Poorten, [A note on the independence of the axioms for a vector space](https://doi.org/10.1017/S1446788700004365), studies structures lacking identity/inverses. Its numbering and independence questions should not be confused with the lecture's eight target properties.

The site therefore includes **eight genuine single-failure examples**, covering the six possible targets, plus **one clearly labelled dependency case** for A2/A3. The A4 exercise has been removed; the reference dialog retains a fully worked derivation of A4 from the other axioms. It never mislabels a multiple-failure structure as a single-failure one.

## The eight genuine near-examples

All the operations in this table are total and closed on the stated nonempty set. Ordinary `+` and juxtaposition on the right-hand side mean the usual arithmetic; `#` and `⊙` are the operations being tested.

| ID | Set / scalar field | Addition | Scalar action | Sole failure |
|---|---|---|---|---|
| `a1` | ℝ² / ℝ | `u+v` if `u₁v₂=u₂v₁`; `2(u+v)` otherwise | `αu` | A1 |
| `a3` | {0,1} / ℝ | `max(u,v)` | `u`, for every α, including 0 | A3 |
| `a5` | ℂ² / ℂ | usual | `α(z,w)` if w=0; `conj(α)(z,w)` otherwise | A5 |
| `a6` | ℝ / ℝ | usual | `α²u` | A6 |
| `a7` | ℂ / ℂ | usual | `Re(α)u` | A7 |
| `a8` | ℝ / ℝ | usual | `0` | A8 |
| `absolute` | ℝ / ℝ | usual | `abs(α)u` | A6 |
| `projection` | ℝ² / ℝ | usual | `(αx,0)` | A8 |

### A1: a nonassociative addition

The definition and student explanations use only products of coordinates. With the zero vector the two products are both zero, so it is an identity. For `u` and `−u`, the products are both `−u₁u₂`, giving an inverse. Swapping the vectors swaps the two products, leaving the chosen branch unchanged; ordinary coordinatewise addition is commutative, giving A4. Multiplying both vectors by a nonzero scalar multiplies both comparison products by α², preserving whether they are equal, hence A5; for α=0 both sides vanish. For `αu` and `βu`, both comparison products equal `αβu₁u₂`, giving A6 with ordinary addition. A7 and A8 are usual scalar multiplication.

For `u=(1,0)` and `v=w=(0,1)`, the two bracketings give `(4,6)` and `(2,4)`, so A1 fails. No continuity of the addition is required by the lecture's definition.

### A3: a two-element semilattice

Maximum is associative, commutative, and has neutral element 0 on {0,1}. But no element can be added to 1 to give 0. Every scalar acts as the identity, so A5, A7, A8 are immediate. A6 is precisely the identity `max(u,u)=u`, even when α+β=0. One must not impose the derived vector-space theorem `0 ⊙ u = 0_E` on this structure.

### A5: branch-dependent complex multiplication

Addition is the usual abelian group operation on ℂ², so A1–A4 hold. For a fixed vector, the scalar map is either α↦α or α↦conj(α), both additive, giving A6. A nonzero scalar does not change whether w is zero; composition thus uses the same branch and conjugation preserves products, giving A7. If the inner scalar is zero, both sides of A7 are the zero vector. Both branches send scalar 1 to the identity, giving A8.

With α=i, u=(1,0), v=(0,1), A5 has left side `(−i,−i)` and right side `(i,−i)`. **The scalar field really is ℂ.** Restriction to real scalars would restore the usual action and remove this failure.

### A6: square or absolute value of the scalar

In both variants addition is usual, so A1–A4 hold. For fixed α, multiplication by α² or |α| is additive in the vector, giving A5. Both functions of α preserve products and the value 1, giving A7 and A8.

For the square variant, α=β=u=1 gives 4 versus 2 in A6. For the absolute value variant, α=1, β=−1, u=1 gives 0 versus 2.

### A7: retaining only the real part

The usual complex addition supplies A1–A4. Multiplication by the real number Re(α) is additive in the vector, giving A5. The map Re is additive and Re(1)=1, giving A6 and A8. However α=β=i, u=1 yields `Re(i²)u=−1` while the successive actions yield 0. Again, the scalar field is ℂ.

### A8: zero action or a projection

For the zero action, A5, A6 and A7 have zero on both sides, and A1–A4 come from usual addition. Yet `1 ⊙ 1=0`.

For the projection example, A5 and A6 follow by expanding the first coordinate. A7 holds because dropping the second coordinate twice is the same as dropping it once. But `1 ⊙ (0,1)=(0,0)`. It is a nonzero scalar action still failing only A8.

## Dependency case

- `a2`: ℝ with maximum and the scalar action α⊙u=u. For any proposed neutral e, the number e−1 refutes neutrality. A3 also fails in the lecture's sense. All remaining six axioms hold.

## Other examples and closure

The ordinary examples use entrywise/coefficientwise/pointwise addition. The homogeneous plane is exactly `x−y+z=0`, generated by `(1,2,1)` and `(0,1,1)` as on page 22. The trigonometric example is `span{sin,cos}` as on page 23.

For positive reals with u#v=uv and α⊙u=u^α, the logarithm is a bijection to the usual real vector space. Thus the zero vector is 1 and the inverse of u is 1/u. For the transported operations u#v=u+v−3 and α⊙u=3+α(u−3), the bijection T(u)=u−3 gives all eight axioms, with zero vector 3.

The mismatched shifted addition u#v=u+v+1 with ordinary scalar multiplication fails A5 and A6 only. The additive identity is −1 and the inverse of u is −u−2.

The four closure exercises use explicit witnesses:

- Upper half-plane: addition is closed; scalar −1 takes (0,1) outside.
- Unit circle: (1,0)+(1,0) and 0·(1,0) leave the set.
- Integer lattice over ℝ: addition is closed; scalar 1/2 takes (1,0) outside.
- Polynomials of exact degree 2: x²+(−x²) and 0·x² leave the set.

For these four exercises, the site asks only the two closure questions. Once an operation is not a map into E, it does not assert truth values for the eight internal axioms. This avoids confusing valid identities in an ambient vector space with well-defined operations on a subset.

## Validation scope

`proofs.js` supplies all 168 property explanations as numbered, fully worked demonstrations or counterexamples. It also supplies nonemptiness and closure proofs for every structure whose axioms are assessed. Each student response immediately opens its corresponding explanation.

`tests/math.test.js` implements independent numerical models for all unusual operations, checks every available scalar/vector combination in representative samples, verifies the displayed witnesses, and exhaustively checks grading for all complete Yes/No combinations. It also checks that unanswered properties remain ungraded and that saved progress migrates correctly. Such finite tests find implementation and answer-key errors; the universal arguments above and the per-property explanations are the actual mathematical justifications.
