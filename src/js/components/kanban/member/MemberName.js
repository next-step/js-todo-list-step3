import { MEMBER_PROPS } from '../../../constants/PROPERTIES.js'

const renderTemplate = (member) => {
  return `
    <h2>
      <span><strong>${member[MEMBER_PROPS.NAME]}</strong>'s Todo List</span>
    </h2>
  `
}

const MemberName = () => {
  const render = (member) => {
    return renderTemplate(member)
  }

  return { render }
}

export default MemberName
