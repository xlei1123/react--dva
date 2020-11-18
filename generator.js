function * generator() {
  let a = yield 1;
  console.log(a);
  let b = yield 2;
  console.log(b)
  let c = yield 3;
  console.log(c)
}

let it = generator();
let r1 = it.next();
console.log(r1)
let r2 = it.next('avalue');  
// it.return() 直接结束
console.log(r2)
let r3 = it.next('bvalue');
console.log(r3)
let r4 = it.next('cvalue');
console.log(r4)