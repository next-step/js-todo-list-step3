export const DOM_ID = {
  TEAM_LIST: '.team-list-container',
  ADD_TEAM: '#add-team-button',

  TEAM_TITLE: '#user-title',

  TODO_LIST: '.todoapp-list-container',
};

export const ACTION = {
  DELETE_TODO: 'destroy',
  TOGGLE_TODO: 'toggle',
  ALL_DELETE_TODO: 'clear-completed',
  CHANGE_FILTER: 'change-filter',
  CREATE_MEMBER: 'add-member',
};

export const KEY = {
  ENTER: 'Enter',
  ESC: 'Escape',
};

export const FILTER = {
  ALL: 'all',
  PRIORITY: 'priority',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const PRIORITY = {
  NONE: 'select',
  FIRST: 'primary',
  SECOND: 'secondary',
};

export const BASE_URL = `https://js-todo-list-9ca3a.df.r.appspot.com/api/teams`;

export const MESSAGGE = {
  CREATE_TEAM: '팀 이름을 입력해주세요',
  CREATE_USER: '이름을 입력해주세요.',
  CREATE_CONTENTS_VALIDATE_ERROR: '컨텐츠 생성 오류 - 최소 2글자 이상이어야 합니다.',
};
