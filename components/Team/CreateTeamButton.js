import teamApis from '../../api/team.js'

export default function CreateTeamButton({ selector, renderTeamList }) {
  if (new.target !== CreateTeamButton) {
    return new CreateTeamButton({ selector, renderTeamList })
  }
  this.init = () => {
    this.$target = document.querySelector(selector)
    this.bindEvent()
  }

  this.bindEvent = () => {
    const onAddTeamListener = async () => {
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
