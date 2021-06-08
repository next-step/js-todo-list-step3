import { TeamList } from '../components/index.js'
import Loading from '../components/Loading.js'
import Observable from '../core/Observer/Observable.js'
import { loadingEnd, loadingStart } from '../modules/common/creator.js'
import { store } from '../modules/store/homepage.js'
import { getTeams } from '../modules/team/creator.js'
import TeamConnector from '../utils/connector/TeamConnector.js'

class App {
  constructor() {
    const teamListTarget = document.querySelector('#team-list-container')
    const loadingTarget = document.querySelector('#loading')

    store.subscribe(() => {
      new TeamList(teamListTarget)
      new Loading(loadingTarget, store)
    })

    this.fetchTeams()
  }

  async fetchTeams() {
    store.dispatch(loadingStart())
    const getAllTeams$ = Observable.fromPromise(TeamConnector.getTeams())

    getAllTeams$.subscribe({
      next(teams) {
        store.dispatch(getTeams(teams))
      },
      error(e) {
        console.error(e)
      },
      complete() {
        store.dispatch(loadingEnd())
      },
    })
  }
}

new App()
