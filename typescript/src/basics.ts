function addItUp(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result)
    return
  } else {
    return result;
  }
}

const number1 = 5 // inferred as const number1: number = 5
const number2 = 2.8
const logResult = true
const resultPhrase = 'Result is: '

addItUp(number1, number2, logResult, resultPhrase)