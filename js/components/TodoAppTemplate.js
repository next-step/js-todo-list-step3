import {
  todoAppContainerTemplate,
  addUserButtonContainerTemplate,
} from '../utils/template.js'
import { validateNewInstance, validateElement } from '../utils/validator.js'

export default function TodoAppTemplate({ members, $target }) {
  validateNewInstance(new.target, TodoAppTemplate)
  validateElement($target)

  this.render = function () {
    this.$target.innerHTML = `${this.members
      .map(todoAppContainerTemplate)
      .join('')}${addUserButtonContainerTemplate}`
  }

  this.setState = function (nextData) {
    this.members = nextData
    this.render()
  }

  this.init = function () {
    this.$target = $target
    this.members = members

    this.render()
  }

  this.init()
}
