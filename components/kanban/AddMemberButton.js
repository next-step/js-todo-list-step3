import memberApis from '../../api/member.js'

export default function AddMemberButton(props) {
  if (new.target !== AddMemberButton) {
    return new AddMemberButton(props)
  }
  const { selector, teamId, renderKanbanPage } = props

  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onAddMemberListener = async () => {
      const memberName = prompt('새로운 팀원 이름을 입력해주세요')
      if (!memberName) {
        return
      }
      await memberApis.addTeamMember(teamId, memberName)
      renderKanbanPage() // re-render
    }

    this.$target.addEventListener('click', onAddMemberListener)
  }

  this.init()
}
