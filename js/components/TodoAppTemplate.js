import {
  todoAppContainerTemplate,
  addUserButtonContainerTemplate,
} from '../utils/template.js'

export default function TodoAppTemplate({ members, $target }) {
  if (!new.target) {
    throw new Error('TodoAppContainerTemplate must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

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
