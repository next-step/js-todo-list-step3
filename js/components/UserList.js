import {
  todoAppContainerTemplate,
  addUserButtonContainerTemplate,
} from '../utils/template.js'

export default function UserList({ members, $target, onAddUser }) {
  if (!new.target) {
    throw new Error('UserList must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  const onClickHandler = (e) => {
    const $target = e.target
    const $targetElem = $target.closest('button')

    if (!$targetElem || !$targetElem.classList.contains('ripple')) {
      return
    }
    const name = prompt('팀원 이름을 입력하세요')
    if (!isString(name)) {
      return
    }
    onAddUser(name.trim())
  }

  this.render = function () {
    this.$target.innerHTML = `${todoAppContainerTemplate}.join('')`
  }

  this.setState = function (nextData) {
    this.members = members
    this.render()
  }

  this.init = function () {
    this.members = members
    this.$target = $target

    this.$target.addEventListener('click', onClickHandler)
  }
  this.init()
}
