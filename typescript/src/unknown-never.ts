let userInput: unknown
let userName: string

userInput = 5
userInput = 'Max'
if (typeof userInput === 'string') {
  userName = userInput
}

function generateError(message: string, code: number): never { // inferred as 'void', but using never is clearer
  throw { message: message, errorCode: code }
}

const result = generateError('An error occurred!', 500)
console.log(result)