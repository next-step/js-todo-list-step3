import { FILTER_PROPS, MEMBER_PROPS, TODO_PROPS, PRIORITY_SORT } from '../constants/PROPERTIES.js'

export const teamListStore = (function () {
  let teamList = []
  const teamListListener = []

  const subscribeTeamList = (callback) => {
    return teamListListener.push(callback)
  }

  const publishTeamList = () => {
    return teamListListener.map((listener) => {
      return listener(teamList)
    })
  }

  const setTeamList = (newTeamList) => {
    teamList = newTeamList
    publishTeamList()
  }

  return { subscribeTeamList, setTeamList }
})()

export const teamStore = (function () {
  let team = {}
  const teamListener = []

  let filterList = []

  const initFilter = () => {
    filterList = team.members.map((member) => ({ [FILTER_PROPS.ID]: member[MEMBER_PROPS.ID], [FILTER_PROPS.FILTER]: 'all' }))
  }

  const filteredList = (todoList, filter) => {
    if (filter === 'active') {
      return todoList.filter(todo => !todo.isCompleted)
    }
    if (filter === 'completed') {
      return todoList.filter(todo => todo.isCompleted)
    }
    if (filter === 'priority') {
      const prioritySort = (firstEl, secondEl) => {
        const firstElPriorityValue = PRIORITY_SORT[firstEl[TODO_PROPS.PRIORITY]]
        const secondElPriorityValue = PRIORITY_SORT[secondEl[TODO_PROPS.PRIORITY]]

        return firstElPriorityValue - secondElPriorityValue
      }

      return [...todoList].sort(prioritySort)
    }
    return todoList
  }

  const subscribeTeam = (callback) => {
    return teamListener.push(callback)
  }

  const publishTeam = () => {
    const filteredTeam = {
      ...team,
      members: team.members.map((member) => {
        const filter = filterList
          .find((filterItem) => filterItem[FILTER_PROPS.ID] === member[MEMBER_PROPS.ID])
          ?.[FILTER_PROPS.FILTER] || 'all'

        if (filter !== 'all') {
          return { ...member, todoList: filteredList(member.todoList, filter) }
        }

        return { ...member }
      })
    }

    return teamListener.map((listener) => {
      return listener(filteredTeam)
    })
  }

  const setTeam = (newTeamList) => {
    team = newTeamList
    if (filterList.length === 0) initFilter()
    publishTeam()
  }

  const setFilter = (filterState) => {
    const prev = filterList
      .find((filterItem) => filterItem[FILTER_PROPS.ID] === filterState[FILTER_PROPS.ID])

    if (prev[FILTER_PROPS.FILTER] !== filterState[FILTER_PROPS.FILTER]) {
      filterList = [
        ...filterList
          .filter((filterItem) => filterItem[FILTER_PROPS.ID] !== filterState[FILTER_PROPS.ID]),
        filterState
      ]
      publishTeam()
    }
  }

  const getFilter = () => {
    return filterList
  }

  return { subscribeTeam, setTeam, setFilter, getFilter }
})()
