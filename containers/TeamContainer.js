import { Header, TeamList } from '../components/Team/index.js'

export default function TeamContainer() {
  if (new.target !== TeamContainer) {
    return new TeamContainer()
  }
  this.init = () => {
    new Header({ selector: '#user-title' })
    new TeamList({ selector: '.team-list-container' })
  }
  this.init()
}
