import { MINIMUM_LENGTH } from "./constant.js";

const INFORM_MESSAGES = {
  ADD_TEAM: "새로운 팀 이름을 입력해주세요",
  ADD_MEMBER: "새로운 멤버 이름을 입력해주세요.",
};

const ERROR_MESSAGES = {
  GET_TEAM_LIST: "팀 리스트 불러오기에 실패했습니다.",
  ADD_TEAM: "팀 추가하기에 실패했습니다.",
  GET_TEAM: "팀 데이터 불러오기에 실패했습니다.",
  ADD_MEMBER: "새 멤버 추가 하기에 실패했습니다.",
  TOO_SHORT_USER_NAME: `최소 ${MINIMUM_LENGTH.USER_NAME}글자 이상이어야 합니다.`,
  TOO_SHORT_ITEM_CONTENTS: `최소 ${MINIMUM_LENGTH.ITEM_CONTENTS}글자 이상이어야 합니다.`,
  ADD_MEMBER: "멤버 추가에 실패했습니다.",
  GET_TODO_LIST: "할 일 목록을 불러오는데 실패했습니다.",
  ADD_ITEM: "할 일 추가에 실패했습니다.",
  DELETE_ALL_ITEMS: "모두 삭제하기에 실패했습니다.",
  DELETE_ITEM: "할 일 삭제하기에 실패했습니다.",
  COMPLETE_ITEM: "할 일 완료에 실패했습니다.",
  EDIT_ITEM: "할 일 수정에 실패했습니다.",
  SET_PRIORITY: "우선순위 지정에 실패했습니다.",
};

export { INFORM_MESSAGES, ERROR_MESSAGES };
