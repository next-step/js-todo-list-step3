import { Header } from '../components/common/index.js'
import { TeamList } from '../components/Team/index.js'
import { teamHeaderTemplate } from '../utils/templates.js'

export default function TeamContainer() {
  if (new.target !== TeamContainer) {
    return new TeamContainer()
  }

  this.init = () => {
    new Header({ selector: '#user-title', textContent: teamHeaderTemplate })
    new TeamList({ selector: '.team-list-container' })
  }

  this.init()
}
