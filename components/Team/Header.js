import { teamPageHeaderTeamplate } from '../../utils/templates.js'

export default function Header({ selector }) {
  if (new.target !== Header) {
    return new Header({ selector })
  }

  this.init = () => {
    const $target = document.querySelector(selector)
    $target.innerHTML = teamPageHeaderTeamplate
  }

  this.init()
}
