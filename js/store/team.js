import { getTeams, getTeam } from '../endpoint/team/controller.js';
import { useFamily, useState } from '../lib/state.js';

const [teamName, setTeamName] = useState('team');
const [teamList, setTeamList] = useState([]);
const [teamID, setTeamID] = useState('');
const [teamMembers, setTeamMembers] = useFamily('_id');

export const getter = {
  teamList, teamName, teamID, teamMembers,
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
  addMemberTodoItem(teamId, memberId, newTodo) {
    const [getMember, setMember] = getter.teamMembers().get(memberId);
    const member = getMember();
    const todoList = [
      ...member.todoList,
      newTodo,
    ];
    const newMember = {
      ...member,
      todoList,
    };
    setMember(newMember);
  },
};

export const dispatch = {
  teamList() {
    getTeams().then(res => {
      setTeamList(res);
    });
  },

  team(teamId) {
    getTeam({ teamId }).then(({ _id, name, members }) => {
      setter.teamInfo({ _id, name, members });
    });
  },


};

