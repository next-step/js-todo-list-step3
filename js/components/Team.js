import { api } from '../api/api.js'
import TeamList from './TeamList.js'

export default function Team() {
  const onAddTeam = async (name) => {
    await api.addTeam({ name })
    this.setState(this.teams)
  }

  this.setState = async function (teams) {
    this.teams = teams
    this.teams = await api.getTeamList()

    this.teamList.setState(this.teams)
  }

  this.init = async function () {
    this.teams = await api.getTeamList()
    this.$teamListContainer = document.querySelector('.team-list-container')

    try {
      this.teamList = new TeamList({
        teams: this.teams,
        $target: this.$teamListContainer,
        onAddTeam,
      })
    } catch (err) {
      console.error(err)
    }
  }

  this.init()
}

new Team()
