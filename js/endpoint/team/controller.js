import { team, member, todoItem } from './api.js';
import { GET, POST, DELETE, PUT } from '../RestApi.js';

// 팀 추가
export const postTeam = async({ name }) => {
  try {
    const result = await POST(team(), { name });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀 불러오기
export const getTeam = async({ teamId }) => {
  try {
    const result = await GET(team(teamId));
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀 리스트 불러오기
export const getTeams = async() => {
  try {
    const result = await GET(team());
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀 삭제
export const deleteTeam = async({ teamId }) => {
  try {
    await DELETE(team(teamId));
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀에 멤버 추가
export const postMember = async({ teamId, name }) => {
  try {
    const result = await POST(member(teamId), { name });
    return result;
  } catch (error) {
    console.log(error);
  }
};


// 팀원별 TodoList 불러오기
export const getMember = async({ teamId, memberId }) => {
  try {
    const result = await GET(member(teamId, memberId));
    return result;
  } catch (error) {
    // 멤버가 없을 경우 에러처리
    // 팀이 없을 경우 에러처리
    console.log(error);
  }
};


// 팀원의 TodoItem 추가하기
export const postTodoItem = async({ teamId, memberId, contents }) => {
  try {
    // TODO 인자의 중첩을 줄이자
    const result = await POST(todoItem(teamId, memberId), { contents });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem 삭제하기
// 이미 삭제된 todo를 삭제할 경우의 서버의 에러처리는 없음. 프론트에서 todo를 삭제하기 전에 todo가 존재하는지의 여부를 확인하는 로직이 추가할 수있음
// 성공할 경우 {} 빈 객체를 서버에서 보내줌.
// 단일 todo를 get 하는 api가 존재하지 않음.
export const deleteTodoItem = async({ teamId, memberId, itemId }) => {
  try {
    const result = await DELETE(todoItem(teamId, memberId, itemId));
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem toggle 하기
export const putTodoItemComplete = async({ teamId, memberId, itemId }) => {
  try {
    const result = await PUT(todoItem(teamId, memberId, itemId, { toggle: true }));
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem contents 수정하기
export const putTodoItemContents = async({ teamId, memberId, itemId, contents }) => {
  try {
    const result = await PUT(todoItem(teamId, memberId, itemId), { contents });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem 우선순위 수정하기
export const putTodoItemPriority = async({ teamId, memberId, itemId, priority }) => {
  try {
    const result = await PUT(todoItem(teamId, memberId, itemId, { priority }), { priority });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem 전부 삭제
export const deleteMemberTodoListAll = async({ teamId, memberId }) => {
  try {
    const result = await DELETE(todoItem(teamId, memberId));
    return result;
  } catch (error) {
    console.log(error);
  }
};

