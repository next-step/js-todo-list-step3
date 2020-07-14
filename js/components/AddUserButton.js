import { isString, validateNewInstance, validateElement } from '../utils/validator.js'

export default function AddUserButton({ $target, onAddUser }) {
  validateNewInstance(new.target, AddUserButton)
  validateElement($target)

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

  this.init = function () {
    this.$target = $target
    this.$target.addEventListener('click', onClickHandler)
  }

  this.init()
}
