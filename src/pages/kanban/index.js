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

    store.subscribe(() => {
      new Loading(loadingTarget, store)
      new UserTitle(userTitleTarget, store)
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
        console.error(e)
      },
      complete() {
        store.dispatch(loadingEnd())
        console.log(store.getState())
      },
    })
  }

  getTeamId() {
    const { id } = getUrlParams()
    return id
  }
}
// function App() {
//   const $todoApps = document.querySelector('.todoapp-list-container')
//   $todoApps.addEventListener('click', (e) => {
//     const $target = e.target
//     const targetClassList = $target.classList
//     if (targetClassList.contains('chip')) {
//       const $chipSelect = $target
//         .closest('.chip-container')
//         .querySelector('select')
//       $target.classList.add('hidden')
//       $chipSelect.classList.remove('hidden')
//     }
//   })

//   const $addUserButton = document.querySelector('#add-user-button')
//   $addUserButton.addEventListener('click', () => {
//     const result = prompt('새로운 팀원 이름을 입력해주세요')
//   })
// }

new App()
