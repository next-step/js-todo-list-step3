import { validateNewInstance, validateElement } from '../utils/validator.js'

export default function UserTitle({ teamName, $target }) {
  validateNewInstance(new.target, UserTitle)
  validateElement($target)

  this.render = function () {
    this.$teamName.innerHTML = this.teamName
  }

  this.setState = function (nextData) {
    this.teamName = nextData
    this.render()
  }

  this.init = function () {
    this.teamName = teamName
    this.$target = $target

    this.$teamName = this.$target.querySelector('strong')
    this.render()
  }

  this.init()
}
