import { createTeamButtonTemplate } from '../../utils/templates.js'

export default function CreateTeamButton({ selector }) {
  if (new.target !== CreateTeamButton) {
    return new CreateTeamButton({ selector })
  }
  this.init = () => {
    this.$target = document.querySelector(selector)
    this.$target.innerHTML = createTeamButtonTemplate()
    console.log('팀생성 버튼 Paint Done')
  }

  this.init()
}
