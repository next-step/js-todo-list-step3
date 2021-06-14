import api from '../api/index.js';

const team = (() => {
  let selectedTeam = {};
  let teams = {};

  const init = async () => {
    const teams = await team.getList();
    selectedTeam = teams[0];
  };

  const mapTeam = (team) => {
    return {
      ...team,
      isSelected: team._id === selectedTeam._id,
    };
  };

  const getList = async () => {
    teams = await api.team.getList();
    return teams.map(mapTeam);  
  };

  const get = async (id) => {
    selectedTeam = await api.team.get(id);
    return selectedTeam;
  }

  const create = async (name) => {
    await api.team.add({name});
  };

  const deleteTeam = async (teamId) => {
    await api.team.delete(teamId);
  };

  const setSelected =  async(value) => {
    selectedTeam = value;
  }

  const getSelected = async() => {
    return selectedTeam;
  }

  return {
    init,
    getList,
    get,
    create,
    deleteTeam,
    setSelected,
    getSelected
  }

})();

export default team;