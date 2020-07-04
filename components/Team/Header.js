import { teamHeaderTemplate } from '../../utils/templates.js'

export default function Header({ selector }) {
  this.init = () => {
    const $target = document.querySelector(selector)
    $target.innerHTML = teamHeaderTemplate
  }
  this.init()
}
