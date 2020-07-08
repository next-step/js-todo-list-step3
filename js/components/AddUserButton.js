import { addUserButtonContainerTemplate } from '../utils/template.js'
import { isString } from '../utils/validator.js'

export default function AddUserButton({ $target, onAddUser }) {
  if (!new.target) {
    throw new Error('MemberList must be called with new')
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

  this.init = function () {
    this.$target = $target
    this.$target.addEventListener('click', onClickHandler)
  }

  this.init()
}
