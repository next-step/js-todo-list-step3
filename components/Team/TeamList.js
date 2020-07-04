import teamApis from '../../api/teamApis.js'
import { teamButtonTemplate } from '../../utils/templates.js'

export default function TeamList({ selector }) {
  if (new.target !== TeamList) {
    return new TeamList({ selector })
  }
  this.init = async () => {
    try {
      this.$target = document.querySelector(selector)
      this.teams = await teamApis.getTeams()
      this.render()
    } catch (e) {
      this.teams = []
    }
  }

  this.render = () => {
    this.$target.innerHTML = this.teams.map(teamButtonTemplate).join('')
  }

  this.init()
}
