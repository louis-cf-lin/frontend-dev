function add(n1: number, n2: number) {
  return n1 + n2
}

function printResult(num: number) { // inferred type 'void' (no return)
  console.log('Result: ' + num)
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2
  // const output = cb(result) // output not assigned due to void
  cb(result)
}

printResult(add(5, 12))

let combineValues: (a: number, b: number) => number
// combineValues() should be a function that takes two numbers and returns a number, e.g. add()

combineValues = add

console.log(combineValues(8, 8))

addAndHandle(10, 20, (result) => { // pass an anonymous function
  console.log(result)
  // technically we could still return something here but it will be ignored in addAndHandle() because the function type is specified as returning void
}) 