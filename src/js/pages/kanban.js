import API from '../utils/API.js'
import { teamStore } from '../utils/Store.js'

import AddMember from '../components/kanban/AddMember.js'
import TeamTitle from '../components/kanban/TeamTitle.js'
import Member from '../components/kanban/Member.js'
import { MEMBER_PROPS, TODO_PROPS } from '../constants/PROPERTIES.js'

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
    const result = await API.addNewMember(newMemberName, TeamId)
    teamStore.setTeam(result)
  }

  const handleTodoActions = {
    async addTodo (target) {
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]
      const newTodo = target.value.trim()
      await API.addNewTodo(newTodo, TeamId, memberId)
      await updateTeam()
    },

    async deleteTodo (target) {
      const todoId = target.closest('li[data-type="todo"]').dataset[TODO_PROPS.ID]
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]
      await API.deleteTodo(TeamId, memberId, todoId)
      await updateTeam()
    },

    async toggleTodo (target) {
      const todoId = target.closest('li[data-type="todo"]').dataset[TODO_PROPS.ID]
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]
      await API.toggleTodo(TeamId, memberId, todoId)
      await updateTeam()
    }
  }

  const init = () => {
    TeamTitle()
    Member(handleTodoActions)
    AddMember({ onAdd: handleAddUser })
    return updateTeam()
  }

  init()
}

Kanban()
