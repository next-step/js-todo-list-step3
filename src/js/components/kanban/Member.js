import { FILTER_PROPS, TEAM_PROPS } from '../../constants/PROPERTIES.js'
import { teamStore } from '../../utils/Store.js'

import MemberName from './member/MemberName.js'
import MemberTodoApp from './member/MemberTodoApp.js'

const renderTemplate = (member, children) => {
  return `
    <li ${Object.keys(member)
      .map((key) => `data-${key}="${member[key]}"`)
      .join('')}
      class="todoapp-container"
      data-type="member"
    >
      ${children}
    </li>
  `
}

const Member = (handleTodoActions) => {
  const memberElement = document.getElementById('todoapp-list-container')
  const memberName = MemberName()
  const memberTodoApp = MemberTodoApp(handleTodoActions)

  const changeFilterClass = (filterState) => {
    const filterListElement = document.querySelector(`li[data-${FILTER_PROPS.ID}="${filterState[FILTER_PROPS.ID]}"] .filters`)
    const childFilterArray = [...filterListElement.children]

    childFilterArray.forEach((filterElement) => {
      const filterButtonElement = filterElement.querySelector('.filter')
      if (filterState[FILTER_PROPS.FILTER] === filterButtonElement.dataset.type) {
        filterButtonElement.classList.add('selected')
      }
    })
  }

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

    const currentFilterState = teamStore.getFilter()
    currentFilterState.forEach(filter => changeFilterClass(filter))
  }

  teamStore.subscribeTeam(render)
}

export default Member
