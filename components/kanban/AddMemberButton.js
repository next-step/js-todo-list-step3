import { addMemberButtonTemplate } from '../../utils/templates.js'
import { TAG_NAME } from '../../utils/constants.js'
import memberApis from '../../api/member.js'

export default function AddMemberButton(props) {
  if (new.target !== AddMemberButton) {
    return new AddMemberButton(props)
  }
  const { selector, teamId, renderKanbanPage } = props

  this.init = () => {
    const $target = document.querySelector(selector)
    this.$AddMemberButton = document.createElement('li')
    this.$AddMemberButton.className = 'add-user-button-container'
    this.$AddMemberButton.innerHTML = addMemberButtonTemplate
    $target.appendChild(this.$AddMemberButton)

    this.bindEvent()
  }

  this.bindEvent = () => {
    const onAddMemberListener = async (e) => {
      if (e.target.tagName !== TAG_NAME.BUTTON) {
        return
      }
      const memberName = prompt('새로운 팀원 이름을 입력해주세요')
      if (!memberName) {
        return
      }
      await memberApis.addTeamMember(teamId, memberName)
      renderKanbanPage() // re-render
    }

    this.$AddMemberButton.addEventListener('click', onAddMemberListener)
  }

  this.init()
}
