import { validateNewInstance, validateElement } from '../utils/validator.js'

export default function TodoCount({ data, $target }) {
  validateNewInstance(new.target, TodoCount)
  validateElement($target)

  this.todos = data
  this.$target = $target

  this.setState = function (nextData) {
    this.todos = nextData
    this.render()
  }

  this.render = function () {
    this.$target.innerHTML = this.todos.length
  }

  this.render()
}
