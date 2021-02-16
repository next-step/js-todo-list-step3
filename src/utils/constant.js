export const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const TEAM = Object.freeze({
  MIN_TEAM_NAME_LEN: 2,
});

export const TODO = Object.freeze({
  MIN_MEMBER_NAME_LEN: 2,
  MIN_TODO_LEN: 1,
});

export const MSG = Object.freeze({
  ENTER_NEW_TEAM_NAME: '추가하실 팀 이름을 입력해주세요.',
  ENTER_NEW_MEMBER_NAME: '추가하실 멤버 이름을 입력해주세요.',
});

export const ERR_MSG = Object.freeze({
  TOO_SHORT_TEAM_NAME_LEN: `팀 이름은 ${TEAM.MIN_TEAM_NAME_LEN}글자 이상으로 입력해야 합니다.`,
  TOO_SHORT_MEMBER_NAME_LEN: `멤버 이름은 ${TODO.MIN_MEMBER_NAME_LEN}글자 이상으로 입력해야 합니다.`,
  NOT_EXIST_TEAM_NAME: '존재하지 않는 팀 이름입니다. 이름을 다시 확인해주세요.',
  NOT_ALLOW_BLACK: '공백은 입력하실 수 없습니다.',
});
