import { Header } from '../components/Team/index.js'

export default function TeamContainer() {
  if (new.target !== TeamContainer) {
    return new TeamContainer()
  }
  this.init = () => {
    new Header({ selector: '#user-title' })
  }
  this.init()
}
