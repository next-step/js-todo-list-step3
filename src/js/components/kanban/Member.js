import { TEAM_PROPS } from '../../constants/PROPERTIES.js'
import { teamStore } from '../../utils/Store.js'
import MemberName from './member/MemberName.js'

const renderTemplate = (children) => {
  return `
    <li class="todoapp-container">${children}</li>
  `
}

const Member = () => {
  const memberElement = document.getElementById('todoapp-list-container')
  const memberName = MemberName()

  const render = (team) => {
    const renderResult = team[TEAM_PROPS.MEMBERS].map(member => {
      const childrenArray = [memberName.render(member)]
      return renderTemplate(childrenArray.join(''))
    })
    memberElement.insertAdjacentHTML('afterbegin', renderResult.join(''))
  }

  teamStore.subscribeTeam(render)
}

export default Member
