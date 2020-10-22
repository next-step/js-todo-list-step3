import { getTeams, getTeam } from '../endpoint/team/controller.js';
import { useFamily, useState } from '../lib/state.js';

const [teamName, setTeamName] = useState('team');
const [teamList, setTeamList] = useState([]);
const [teamID, setTeamID] = useState('');
const [teamMembers, setTeamMembers, getMember, setMember] = useFamily('_id');

export const getter = {
  teamList, teamName, teamID, teamMembers, getMember
};

export const setter = {
  teamName(newTeamName) {
    setTeamName(newTeamName);
  },
  teamInfo({ _id, name, members }) {
    setTeamName(name);
    setTeamID(_id);
    setTeamMembers(members);
  },
  member({key, newValue}) {
    setMember({key, newValue});
  }
};

export const dispatch = {
  teamList() {
    getTeams().then(res => {
      setTeamList(res);
    });
  },

  team(itemId) {
    getTeam({ itemId }).then(({ _id, name, members }) => {
      setter.teamInfo({ _id, name, members });
    })
  },
};

