import {
  getTeams,
  getTeam,
  getMember,
  deleteMemberTodoItem,
  postMemberTodoItem,
  postMember,
} from '../endpoint/team/controller.js';
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
  memberInfo(memberId, newMemberInfo) {
    const [, setMember] = getter.teamMembers().get(memberId);
    setMember(newMemberInfo);
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

  async removeMemberTodoItem(teamId, memberId, itemId) {
    await deleteMemberTodoItem({ teamId, memberId, itemId });
    await this.readMemberInfo(teamId, memberId);
  },

  async readMemberInfo(teamId, memberId) {
    const newMemberInfo = await getMember({ teamId, memberId });
    setter.memberInfo(memberId, newMemberInfo);
  },

  async createMemberTodoItem(teamId, memberId, contents) {
    const newTodo = await postMemberTodoItem({ teamId, memberId, contents });
    setter.addMemberTodoItem(teamId, memberId, newTodo);
  },

  async createTeamMember(teamId, name) {
    const newTeamMembers = await postMember({ teamId, name })
    setter.teamInfo(newTeamMembers);
  },
};

