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
export const getTeam = async({ itemId }) => {
  try {
    const result = await GET(team(itemId));
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
export const getMemberTodoList = async({ teamId, memberId }) => {
  try {
    const result = await GET(member(teamId, memberId));
    return result;
  } catch (error) {
    console.log(error);
  }
};


// 팀원의 TodoItem 추가하기
export const postMemberTodoList = async({ teamId, memberId, contents }) => {
  try {
    // TODO 인자의 중첩을 줄이자
    const result = await POST(todoItem(teamId, memberId), { contents });
    return result;
  } catch (error) {
    console.log(error);
  }
};


// 팀원의 TodoItem 삭제하기
export const deleteMemberTodoList = async({ teamId, memberId, itemId }) => {
  try {
    const result = await DELETE(todoItem(teamId, memberId, itemId));
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem toggle하기
export const putMemberTodoListToggle = async({ teamId, memberId, itemId }) => {
  try {
    const result = await PUT(todoItem(teamId, memberId, itemId, { toggle: true }));
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem contents 수정하기
export const putMemberTodoListContents = async({ teamId, memberId, itemId, contents }) => {
  try {
    const result = await PUT(todoItem(teamId, memberId, itemId), { contents });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// 팀원의 TodoItem 우선순위 수정하기
export const putMemberTodoListPriority = async({ teamId, memberId, itemId, priority }) => {
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

