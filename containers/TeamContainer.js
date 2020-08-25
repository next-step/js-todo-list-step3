import { Header } from '../components/common/index.js'
import { TeamList } from '../components/Team/index.js'
import { teamHeaderTemplate } from '../utils/templates.js'
import { CLASS_NAME } from '../utils/constants.js'

export default function TeamContainer() {
  if (new.target !== TeamContainer) {
    return new TeamContainer()
  }

  this.init = () => {
    new Header({
      selector: `.${CLASS_NAME.USER_TITLE}`,
      textContent: teamHeaderTemplate,
    })
    new TeamList({ selector: `.${CLASS_NAME.TEAM_LIST_CONTAINER}` })
  }

  this.init()
}
