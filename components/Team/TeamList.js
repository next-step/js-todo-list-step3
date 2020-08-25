import { CreateTeamButton } from '../../components/team/index.js'
import teamApis from '../../api/team.js'
import {
  teamButtonTemplate,
  createTeamButtonTemplate,
} from '../../utils/templates.js'
import { CLASS_NAME } from '../../utils/constants.js'

export default function TeamList({ selector }) {
  if (new.target !== TeamList) {
    return new TeamList({ selector })
  }
  this.render = async () => {
    try {
      this.$target = document.querySelector(selector)
      this.teams = await teamApis.getTeams()
    } catch (e) {
      this.teams = []
    }

    this.$target.innerHTML = this.teams
      .map(teamButtonTemplate)
      .join('')
      .concat(createTeamButtonTemplate)

    new CreateTeamButton({
      selector: `.${CLASS_NAME.ADD_BUTTON}`,
      renderTeamList: this.render,
    }) // 동기적으로 실행시키기 위해 여기서 인스턴스 생성.
  }

  this.render()
}
