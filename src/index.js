import './css/index.scss'
import $ from 'jquery'

const userStack = {
  language: 'JavaScript',
  framework: 'Angular'
}

const user = {
  name: 'Gabageba',
  age: 20,
  ...userStack
}

$('.block').html('Jquery is working')

console.log(user)