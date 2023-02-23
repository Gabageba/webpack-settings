import './css/index.scss'

const userStack = {
  language: 'JavaScript',
  framework: 'Angular'
}

const user = {
  name: 'Gabageba',
  age: 20,
  ...userStack
}

console.log(user)