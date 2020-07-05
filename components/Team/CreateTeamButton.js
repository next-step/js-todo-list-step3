import { createTeamButtonTemplate } from '../../utils/templates.js'
import { TAG_NAME } from '../../utils/constants.js'
import teamApis from '../../api/teamApis.js'

export default function CreateTeamButton({ selector, renderTeamList }) {
  if (new.target !== CreateTeamButton) {
    return new CreateTeamButton({ selector, renderTeamList })
  }
  this.init = () => {
    this.$target = document.querySelector(selector)

    const $teamButtonContainer = document.createElement('div')
    $teamButtonContainer.className = 'add-team-button-container'
    $teamButtonContainer.innerHTML = createTeamButtonTemplate()

    this.$target.appendChild($teamButtonContainer)
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onAddTeamListener = async (e) => {
      if (e.target.tagName !== TAG_NAME.BUTTON) {
        return
      }
      const teamName = prompt('새로운 팀원 이름을 입력해주세요')
      if (!teamName) {
        return
      }
      await teamApis.create(teamName)
      renderTeamList()
    }

    this.$target.addEventListener('click', onAddTeamListener)
  }

  this.init()
}
