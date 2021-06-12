export const DOM_ID = {
  TEAM_LIST: '.team-list-container',
  ADD_TEAM: '#add-team-button',
  TEAM_TITLE: '#user-title',

  ADD_TODOLIST: '#add-user-button',

  TODO_INPUT: '.new-todo',
  TODO_LIST: '.todoapp-list-container',
  TODO_COUNT: '.count-container',
  TODO_COUNT_RENDER: '.todo-count > strong',

  // USER_LIST: '#user-list',
  // USER_TITLE_RENDER: '#user-title strong',
};

export const KEY = {
  ENTER: 'Enter',
  ESC: 'Escape',
};

export const FILTER = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ALL_DELETED: 'clear-completed',
};

export const PRIORITY = {
  NONE: 'select',
  FIRST: 'primary',
  SECOND: 'secondary',
};

export const BASE_URL = `https://js-todo-list-9ca3a.df.r.appspot.com/api/teams`;

export const MESSAGGE = {
  CREATE_USER: '이름을 입력해주세요.',
  CREATE_USER_VALIDATE_ERROR: '유저 생성 오류 - 최소 2글자 이상이어야 합니다.',

  DELETE_USER: '정말로 삭제하시겠습니까?',

  CREATE_CONTENTS_VALIDATE_ERROR: '컨텐츠 생성 오류 - 최소 2글자 이상이어야 합니다.',

  CREATE_TEAM: '팀 이름을 입력해주세요',
};
