import { TeamList } from '../components/index.js'

class App {
  constructor() {
    const teamListTarget = document.querySelector('#team-list-container')

    new TeamList(teamListTarget)
  }
}

new App()

// import Observable from '../core/Observer/Observable.js'
// import TeamConnector from '../utils/connector/TeamConnector.js'

// const $addTeamButton = document.querySelector('#add-team-button')
// const $app = document.querySelector('#app')
// const createTeam$ = Observable.fromEvent($addTeamButton, 'click')
//   .map(() => prompt('팀 이름을 입력해주세요'))
//   .asyncMap((name) => TeamConnector.getTeams())
//   .map((users) => users.map((user) => user.name))

// const getAllTeams$ = Observable.fromPromise(TeamConnector.getTeams())

// getAllTeams$.subscribe({
//   next(val) {
//     console.log(val)
//   },
//   error(e) {
//     console.log(e)
//   },
//   complete() {
//     console.log('complete')
//   },
// })

// createTeam$.subscribe({
//   next(val) {
//     console.log(val)
//   },
//   error(e) {
//     console.log(e)
//   },
//   complete() {
//     console.log('complete')
//   },
// })
