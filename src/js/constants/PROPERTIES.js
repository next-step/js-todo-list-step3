export const TEAM_PROPS = {
  ID: '_id',
  NAME: 'name',
  MEMBERS: 'members'
}

export const MEMBER_PROPS = {
  ID: '_id',
  NAME: 'name',
  TODO_LIST: 'todoList'
}

export const TODO_PROPS = {
  ID: '_id',
  CONTENTS: 'contents',
  PRIORITY: 'priority',
  IS_COMPLETED: 'isCompleted'
}

export const PRIORITY = {
  FIRST: { key: 'FIRST', class: 'primary', value: '1순위' },
  SECOND: { key: 'SECOND', class: 'secondary', value: '2순위' },
  NONE: { key: 'NONE', class: '', value: '' }
}
