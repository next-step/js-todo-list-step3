import API from '../utils/API.js'
import AddMember from '../components/kanban/AddMember.js'
import { teamStore } from '../utils/Store.js'
import TeamTitle from '../components/kanban/TeamTitle.js'

// function App () {
//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', e => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target.closest('.chip-container').querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })
// }

const Kanban = () => {
  const UrlParams = new URLSearchParams(window.location.search)
  const TeamId = UrlParams.get('id')

  const updateTeam = async () => {
    const getTeam = await API.getTeam(TeamId)
    teamStore.setTeam(getTeam)
  }

  const handleAddUser = async () => {
    const newMemberName = prompt('새로운 팀원 이름을 입력해주세요')
    const result = await API.postMember(newMemberName, TeamId)
    console.log(result)
  }

  const init = () => {
    TeamTitle()
    AddMember({ onAdd: handleAddUser })
    return updateTeam()
  }

  init()
}

Kanban()
