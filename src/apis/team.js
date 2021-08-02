import { fetchAPI, METHOD } from './index';

// 팀 리스트 조회
export const getTeams = () => fetchAPI('teams');

// 팀 조회
export const getTeamById = (teamId) => fetchAPI(`teams/${teamId}`);

// 팀 추가
export const addTeam = (name) => fetchAPI('teams', METHOD.POST, { name });

// 팀 삭제
export const deleteTeam = (teamId) =>
  fetchAPI(`teams/${teamId}`, METHOD.DELETE);
