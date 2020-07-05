import { addMemberButtonTemplate } from '../../utils/templates.js'

export default function AddMemberButton({ selector }) {
  if (new.target !== AddMemberButton) {
    return new AddMemberButton()
  }

  this.init = () => {
    const $target = document.querySelector(selector)
    const $li = document.createElement('li')
    $li.className = 'add-user-button-container'
    $li.innerHTML = addMemberButtonTemplate
    $target.appendChild($li)
  }

  this.init()
}
