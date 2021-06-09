import TodoContainer from '../../components/kanban/TodoContainer.js'
import UserTitle from '../../components/kanban/UserTitle.js'
import Loading from '../../components/Loading.js'
import Observable from '../../core/Observer/Observable.js'
import { loadingEnd, loadingStart } from '../../modules/common/creator.js'
import { store } from '../../modules/store/kanban.js'
import { getTeamData } from '../../modules/todos/creator.js'
import TodoConnector from '../../utils/connector/TodoConnector.js'

function getUrlParams() {
  const params = {}

  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) {
      params[key] = value
    }
  )

  return params
}

class App {
  constructor() {
    const teamId = this.getTeamId()

    const userTitleTarget = document.querySelector('#user-title')
    const loadingTarget = document.querySelector('#loading')
    const todoListTarget = document.querySelector('#todo-list')

    store.subscribe(() => {
      new Loading(loadingTarget, store)
      new UserTitle(userTitleTarget, store)
      new TodoContainer(todoListTarget)
    })

    this.fetchUsers(teamId)
  }

  async fetchUsers(teamId) {
    store.dispatch(loadingStart())
    const getAllTeams$ = Observable.fromPromise(TodoConnector.getTeam(teamId))

    getAllTeams$.subscribe({
      next(teamData) {
        store.dispatch(getTeamData(teamData))
      },
      error(e) {
        location.href = '/index.html'
      },
      complete() {
        store.dispatch(loadingEnd())
      },
    })
  }

  getTeamId() {
    const { id } = getUrlParams()
    return id
  }
}

new App()
