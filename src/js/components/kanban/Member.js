import { MEMBER_PROPS, TEAM_PROPS } from '../../constants/PROPERTIES.js'
import { teamStore } from '../../utils/Store.js'

import MemberName from './member/MemberName.js'
import MemberTodoApp from './member/MemberTodoApp.js'

const renderTemplate = (member, children) => {
  return `
    <li data-id="${member[MEMBER_PROPS.ID]}" class="todoapp-container" data-type="member">
      ${children}
    </li>
  `
}

const Member = ({ onAddTodo }) => {
  const memberElement = document.getElementById('todoapp-list-container')
  const memberName = MemberName()
  const memberTodoApp = MemberTodoApp({ onAddTodo })

  const render = (team) => {
    const childrenArray = [...memberElement.children]

    childrenArray.map((child) => {
      if (child.dataset.type !== 'member') {
        return null
      }
      return child.remove()
    })

    const renderResult = team[TEAM_PROPS.MEMBERS].map(member => {
      const childrenArray = [memberName.render(member), memberTodoApp.render(member)]
      return renderTemplate(member, childrenArray.join(''))
    })
    memberElement.insertAdjacentHTML('afterbegin', renderResult.join(''))
  }

  teamStore.subscribeTeam(render)
}

export default Member
