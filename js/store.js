import Team from './entity/Team.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const store = (rootComponent) => {
  const teamMap = new Map();

  const getTeamList = () => {
    return Array.from([...teamMap.values()]);
  };

  const fetchTeamList = async () => {
    await fetch(BASE_URL + '/api/teams')
      .then((response) => response.json())
      .then((teams) => {
        teams
          .map((team) => {
            return new Team(team);
          })
          .reduce((map, team) => {
            map.set(team._id, team);
            return map;
          }, teamMap);
      });

    // TODO await 썼는데 then에 넣을건지..?
    rootComponent.dispatchEvent(
      new CustomEvent('render', { detail: getTeamList() })
    );
  };

  const createTeam = async (name) => {
    const team = await fetch(BASE_URL + '/api/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((team) => new Team(team));

    teamMap.set(team._id, team);

    rootComponent.dispatchEvent(
      new CustomEvent('render', { detail: getTeamList() })
    );
  };

  return {
    fetchTeamList,
    createTeam,
    getTeamList,
  };
};

export default store;
