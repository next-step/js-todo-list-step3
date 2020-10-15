import { getTeams } from '../endpoint/team/controller.js';
import { useState } from '../lib/state.js';

const [teamName, setTeamName] = useState('');
const [teamList, setTeamList] = useState([]);

export const getter = {
  teamList
};

export const dispatch = {
  teamList() {
    getTeams().then(res => {
      setTeamList(res);
    });
  }
};

