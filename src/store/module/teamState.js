import $api from "../../api/index.js";

const teamState = (() => {
  const state = {};

  const getCurrentTeam = async () => {
    return await $api.team.getById(state.teamId);
  };

  const createMember = async (name) => {
    return await $api.team.createMember(state.teamId, name);
  };

  const setCurrentTeamId = (id) => {
    state.teamId = id;
  };

  const getCurrentTeamId = () => {
    return state.teamId;
  };

  return {
    getCurrentTeam,
    createMember,
    setCurrentTeamId,
    getCurrentTeamId,
  };
})();

export default teamState;
