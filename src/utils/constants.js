/**
 * @readonly
 * @enum {string}
 */
const FILTER_NAMES = new Map([
  ['all', '전체보기'],
  ['active', '남은 투두'],
  ['completed', '완료한 투두'],
  ['priority', '우선 순위 정렬'],
]);

/**
 * @readonly
 * @enum {"all" | "active" | "completed" | "priority"}
 */
const FILTER_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PRIORITY: 'priority',
};

const PRIORITY_ENUM = new Map([
  ['FIRST', 1],
  ['SECOND', 2],
  ['NONE', 0],
  [1, 'FIRST'],
  [2, 'SECOND'],
  [0, 'NONE'],
]);

const PRIORITY_SORT = new Map([
  ['FIRST', 2],
  ['SECOND', 1],
  ['NONE', 0],
]);

const PRIORITY_CLASS = new Map([
  ['NONE', ''],
  ['FIRST', 'primary'],
  ['SECOND', 'secondary'],
]);

const MESSAGES = {
  WELCOME: '🙌 WELCOME 🙌',
  ASK_NAME: 'please insert name',
  NAME_POLICY_NOTICE: 'username should be longer than 2 character',
  CONFIRM_DELETE: 'Wanna destory this?',
  CONFIRM_DELETE_ALL: '😈 Wanna delete every todos?',
};

const USERLIST = {
  FOLD: 'folded',
  UNFOLD: '',
};

export {
  FILTER_NAMES,
  FILTER_STATUS,
  PRIORITY_CLASS,
  PRIORITY_ENUM,
  PRIORITY_SORT,
  MESSAGES,
  USERLIST,
};
