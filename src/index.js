import { TeamList } from './components/index.js'

class App {
  constructor() {
    const teamListTarget = document.querySelector('#team-list-container')

    new TeamList(userListTarget)
  }
}

new App()
