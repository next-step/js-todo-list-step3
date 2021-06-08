import API from '../utils/API.js'
import { teamStore } from '../utils/Store.js'

import AddMember from '../components/kanban/AddMember.js'
import TeamTitle from '../components/kanban/TeamTitle.js'
import Member from '../components/kanban/Member.js'
import { FILTER_PROPS, MEMBER_PROPS, PRIORITY, TODO_PROPS } from '../constants/PROPERTIES.js'

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
    },

    async editTodo (target) {
      const todoId = target.closest('li[data-type="todo"]').dataset[TODO_PROPS.ID]
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]
      const editTodo = target.value.trim()
      await API.editTodo(editTodo, TeamId, memberId, todoId)
      await updateTeam()
    },

    async filterTodo (target) {
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]
      const newFilter = target.dataset.type
      teamStore.setFilter({ [FILTER_PROPS.ID]: memberId, [FILTER_PROPS.FILTER]: newFilter })
    },

    async changePriorityTodo (target) {
      const todoId = target.closest('li[data-type="todo"]').dataset[TODO_PROPS.ID]
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]

      const PriorityArray = Object.keys(PRIORITY)
      const priority = PriorityArray.find((item) => PRIORITY[item].value === target.value)

      await API.changePriorityTodo(priority, TeamId, memberId, todoId)
      await updateTeam()
    },

    async deleteTodoList (target) {
      const memberId = target.closest('li[data-type="member"]').dataset[MEMBER_PROPS.ID]

      await API.deleteTodoList(TeamId, memberId)
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
