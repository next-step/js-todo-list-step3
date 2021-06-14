import MembersState from '@store/membersState.js';

// 액션 타입
const INIT_STATE = 'members/INIT_STATE';
const CREATE_MEMBER = 'members/CREATE_MEMBER';
// todo
const ADD_TODO_ITEM = 'members/ADD_TODO_ITEM';
const DELETE_TODO_ITEM = 'members/DELETE_TODO_ITEM';
const TOGGLE_TODO_ITEM = 'members/TOGGLE_TODO_ITEM';
const UPDTATE_CONTENTS_TODO_ITEM = 'members/UPDTATE_CONTENTS_TODO_ITEM';
const ALL_DELETE_TODO_ITEM = 'members/ALL_DELETE_TODO_ITEM';
const CHANGE_PRIORITY_TODO_ITEM = 'members/CHANGE_PRIORITY_TODO_ITEM';
const CHANGE_FILTER = 'members/CHANGE_FILTER';

// 액션 생성 함수
export const initState = (members) => ({ type: INIT_STATE, payload: { members } });
export const createMember = (member) => ({ type: CREATE_MEMBER, payload: { member } });
export const addTodoItem = (memberId, todoItem) => ({
  type: ADD_TODO_ITEM,
  payload: { memberId, todoItem },
});
export const deleteTodoItem = (memberId, itemId) => ({
  type: DELETE_TODO_ITEM,
  payload: { memberId, itemId },
});
export const toggleTodoItem = (memberId, itemId, todoItem) => ({
  type: TOGGLE_TODO_ITEM,
  payload: { memberId, itemId, todoItem },
});
export const updateContentsTodoItem = (memberId, itemId, todoItem) => ({
  type: UPDTATE_CONTENTS_TODO_ITEM,
  payload: { memberId, itemId, todoItem },
});
export const allDeleteTodoItem = (memberId) => ({
  type: ALL_DELETE_TODO_ITEM,
  payload: { memberId },
});
export const changePirortyTodoItem = (memberId, itemId, todoItem) => ({
  type: CHANGE_PRIORITY_TODO_ITEM,
  payload: { memberId, itemId, todoItem },
});
export const changeFilter = (memberId, filter) => ({
  type: CHANGE_FILTER,
  payload: { memberId, filter },
});

// 초기화 변수
const initialState = [];

// 리듀서
function membersReducer(state = initialState, action) {
  const prevState = state;
  const { type, payload } = action;

  switch (type) {
    case INIT_STATE:
      return payload.members.map((member) => ({ ...member, filter: 'all' }));

    case CREATE_MEMBER:
      return prevState.concat({ ...payload.member, filter: 'all' });

    case ADD_TODO_ITEM:
      return prevState.map((member) =>
        member._id === payload.memberId
          ? { ...member, todoList: member.todoList.concat(payload.todoItem) }
          : member,
      );

    case DELETE_TODO_ITEM:
      return prevState.map((member) =>
        member._id === payload.memberId
          ? {
              ...member,
              todoList: member.todoList.filter((todoItem) => todoItem._id !== payload.itemId),
            }
          : member,
      );

    case TOGGLE_TODO_ITEM:
      return prevState.map((member) =>
        member._id === payload.memberId
          ? {
              ...member,
              todoList: member.todoList.map((todoItem) =>
                todoItem._id === payload.itemId ? payload.todoItem : todoItem,
              ),
            }
          : member,
      );

    case UPDTATE_CONTENTS_TODO_ITEM:
      return prevState.map((member) =>
        member._id === payload.memberId
          ? {
              ...member,
              todoList: member.todoList.map((todoItem) =>
                todoItem._id === payload.itemId ? payload.todoItem : todoItem,
              ),
            }
          : member,
      );

    case ALL_DELETE_TODO_ITEM:
      return prevState.map((member) =>
        member._id === payload.memberId
          ? {
              ...member,
              todoList: [],
            }
          : member,
      );

    case CHANGE_PRIORITY_TODO_ITEM:
      return prevState.map((member) =>
        member._id === payload.memberId
          ? {
              ...member,
              todoList: member.todoList.map((todoItem) =>
                todoItem._id === payload.itemId ? payload.todoItem : todoItem,
              ),
            }
          : member,
      );

    case CHANGE_FILTER:
      return prevState.map((member) =>
        member._id === payload.memberId ? { ...member, filter: payload.filter } : member,
      );

    default:
      throw new Error(`존재하지 않는 action 입니다: ${type}`);
  }
}

export default new MembersState(membersReducer);
