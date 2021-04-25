import API from '../utils/Api.js'
import { teamStore } from '../utils/Store.js'

import TeamList from '../components/team/TeamList.js'

const Team = () => {
  const teamListContainerElement = document.getElementById('team-list-container')

  const updateTeams = async () => {
    const getTeams = await API.getTeams()
    teamStore.setTeamList(getTeams)
  }

  const teamListComponent = TeamList()

  const render = (teamList) => {
    const childrenArray = [...teamListContainerElement.children]

    childrenArray.map((child) => {
      if (child.dataset.type !== 'user') {
        return null
      }
      return child.remove()
    })

    teamListContainerElement.insertAdjacentHTML(
      'afterbegin',
      teamListComponent.render(teamList)
    )
  }

  const init = () => {
    teamStore.subscribeTeamList(render)
    return updateTeams()
  }

  init()
}

const $addTeamButton = document.querySelector('#add-team-button')
$addTeamButton.addEventListener('click', () => {
  const result = prompt('팀 이름을 입력해주세요')
})

Team()
