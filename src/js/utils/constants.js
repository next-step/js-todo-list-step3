export const SELECTOR = {
  APP: '#app',
  TEAM_LIST: '.team-list-container',
  TEAM_TITLE: '#team-title',
  TODOS_CONTAINER: '.todo-app-list-container',
  TODO_LIST_CONTAINER: '.todo-list-container',
  ADD_USER_BUTTON: '.add-user-button-container',
  TODO_ITEM: '.todo-list-item',
  TODO_INPUT: '.input-container',
  CHIP_SELECT: '.select',
  EDIT: '.edit',
  TODO_TAB: '.todo-tab',
  TODO_CLEAR_ALL_BUTON: '.clear-completed',
};

export const CLASS_NAME = {
  TEAM_CARD: 'team-card-container',
  ADD_TEAM_BUTTON: 'add-team-button-container',
  DELETE: 'delete',
  SELECTED: 'selected',
  ALL: 'all',
  PRIORITY: 'priority',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  TOGGLE: 'toggle',
  DESTROY: 'destroy',
  CHIP: 'chip',
  SELECT: 'select',
  LABEL: 'label',
  EDITING: 'editing',
};

export const PRIORITY = {
  NONE: 0,
  PRIMARY: 1,
  SECONDARY: 2,
};

export const KEY = {
  ENTER: 'Enter',
  ESC: 'Escape',
};

export const TEAM_APP_STATE = {
  TEAMS: 'teams',
};

export const TEAM_STATE = {
  NAME: 'name',
  MEMBERS: 'members',
  ID: '_id',
};

export const MEMBER_STATE = {
  NAME: 'name',
  SELECTED_TAB: 'selectedTab',
  TODO_LIST: 'todoList',
  ID: '_id',
};

export const KANBAN_URL = './kanban.html';

export const QUERY = {
  ID: 'id',
};

export const MESSAGE = {
  INPUT_TEAM_NAME: '추가할 팀 이름을 입력하세요 !',
  INPUT_USER_NAME: '추가할 멤버 이름을 입력하세요 !',
  CONFIRM_DELETE: '정말로 삭제하시겠습니까 ?',
  NO_TEAM_NAME: '팀 이름을 입력해주세요 🔥',
  NO_USER_NAME: '멤버 이름을 입력해주세요 🔥',
  UNDEFINED_TAB: '올바르지 않은 TAB이름입니다.',
  UNDEFINED_KEY: '등록되지 않은 KEY 입력입니다.',
  NO_INPUT_KEYWORD: '할일을 입력해주세요 🔥',
  NOT_HTML_ELEMENT: 'HTML Element가 존재하지 않습니다.',
  NOT_TYPE_ARRAY: 'type이 Array가 아닙니다.',

  TEAMS_PROPERTY_ERROR: `${TEAM_APP_STATE.TEAMS}속성을 확인해주세요.`,
  MEMBERS_PROPERTY_ERROR: `${TEAM_STATE.MEMBERS}속성을 확인해주세요.`,
  ID_PROPERTY_ERROR: `${TEAM_STATE.ID}속성을 확인해주세요.`,
  NAME_PROPERTY_ERROR: `${TEAM_STATE.NAME}속성을 확인해주세요.`,
  TODO_LIST_PROPERTY_ERROR: `${MEMBER_STATE.TODO_LIST}속성을 확인해주세요.`,
  SELECTED_TAB_PROPERTY_ERROR: `${MEMBER_STATE.SELECTED_TAB}속성을 확인해주세요.`,
};
