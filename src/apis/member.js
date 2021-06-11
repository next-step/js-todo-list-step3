import { fetchAPI, METHOD } from './index';

// 맴버 추가
export const addMember = (teamId, name) =>
  fetchAPI(`/api/teams/${teamId}/members`, METHOD.POST, { name });
