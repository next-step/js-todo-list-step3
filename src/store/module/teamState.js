import $api from "../../api/index.js";

const teamState = (() => {
  const state = {};

  const setTeamId = (id) => {
    state.teamId = id;
  };

  const getCurrentTeam = async () => {
    return await $api.team.getById(state.teamId);
  };

  const createMember = async (name) => {
    return await $api.team.createMember(state.teamId, name);
  };

  return {
    setTeamId,
    getCurrentTeam,
    createMember,
  };
})();

export default teamState;
