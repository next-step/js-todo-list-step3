import { getTeams, getTeam } from '../endpoint/team/controller.js';
import { useState } from '../lib/state.js';

const [teamName, setTeamName] = useState('team');
const [teamList, setTeamList] = useState([]);
const [team, setTeam] = useState({});

export const getter = {
  teamList, teamName, team
};

export const setter = {
  teamName(newTeamName) {
    setTeamName(newTeamName);
  },
};

export const dispatch = {
  teamList() {
    getTeams().then(res => {
      setTeamList(res);
    });
  },

  team(itemId) {
    getTeam({ itemId }).then(res => {
      setTeam(res);
      if (res.name !== getter.teamName)
        setter.teamName(res.name);
    });
  },
};

