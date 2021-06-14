import api from '../../constant/api.js';
import { getIndex } from '../../utils/utils.js';
import { ALL } from '../../constant/constant.js';

export const addTeamHandler = async (store, dataLoader) => {
  const result = prompt('팀 이름을 입력해주세요');
  result && result.trim();
  if (!result || result.length < 2) return;

  const body = {
    name: result
  }
  const team = await dataLoader.postData(api.teamURL, body);
  store.dispatch('addTeam', [team]);
}

const getTeamInfo = (target, store) => {
  const teamIndex = getIndex(target.closest('.team-card-container').dataset);
  const team = store.getState('teams')[teamIndex];
  const { _id: teamId, members } = team;
  return { teamIndex, team, teamId, members };
}

export const clearTeamHandler = async (target, store, dataLoader) => {
  const { teamIndex, teamId } = getTeamInfo(target, store);
  await dataLoader.deleteData(api.deleteTeamURL(teamId));
  store.dispatch('clearTeam', { teamIndex });
};

export const setCurrentTeamHandler = (target, store) => {
  const { teamIndex, team, members } = getTeamInfo(target, store);
  const newTeam = { ...team };
  newTeam.members = members.map((member) => ({ ...member, filter: ALL }));
  store.dispatch('setCurrentTeam', { teamIndex });
};

export const toggleKanbanViewHandler = (team, kanban) => {
  team.style.display = 'none';
  kanban.style.display = 'block';
}