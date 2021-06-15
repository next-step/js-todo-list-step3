import { fetchAPI, METHOD } from './index';

// 투두 리스트 조회
export const getTodos = (teamId, memberId) =>
  fetchAPI(`teams/${teamId}/members/${memberId}`);

// 투두 추가
export const addTodo = (teamId, memberId, contents) =>
  fetchAPI(`teams/${teamId}/members/${memberId}/items`, METHOD.POST, {
    contents,
  });

// 투두 업데이트
export const updateTodo = (teamId, memberId, itemId, contents) =>
  fetchAPI(`teams/${teamId}/members/${memberId}/items/${itemId}`, METHOD.PUT, {
    contents,
  });

// 투두 삭제
export const deleteTodo = (teamId, memberId, itemId) =>
  fetchAPI(
    `teams/${teamId}/members/${memberId}/items/${itemId}`,
    METHOD.DELETE
  );

// 투두 모두 삭제
export const deleteAllTodo = (teamId, memberId) =>
  fetchAPI(`teams/${teamId}/members/${memberId}/items`, METHOD.DELETE);

// 투두 토글
export const toggleTodo = (teamId, memberId, itemId) =>
  fetchAPI(
    `teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
    METHOD.PUT
  );

// 우선순위 수정
export const setPriority = (teamId, memberId, itemId, priority) =>
  fetchAPI(
    `teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
    METHOD.PUT,
    {
      priority,
    }
  );
