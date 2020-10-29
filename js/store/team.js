import {
  getTeams,
  getTeam,
  getMember,
  deleteTodoItem,
  postTodoItem,
  postMember, putTodoItemComplete, putTodoItemContents,
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

  addTodoItem(memberId, newTodo) {
    const [getMember, setMember] = getter.teamMembers().get(memberId);
    const member = getMember();
    const todoList = member?.todoList?.concat(newTodo) || [newTodo];
    const newMember = {
      ...member,
      todoList,
    };
    setMember(newMember);
  },

  todoItem(memberId, newTodo) {
    const [getMember, setMember] = getter.teamMembers().get(memberId);
    const member = getMember();
    const { _id } = newTodo;

    const todoList = member.todoList.map((todo) => (todo._id === _id) ? newTodo : todo);

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

  async removeTodoItem({ teamId, memberId, itemId }) {
    await deleteTodoItem({ teamId, memberId, itemId });
    await dispatch.readMemberInfo(teamId, memberId);
  },

  async readMemberInfo(teamId, memberId) {
    const newMemberInfo = await getMember({ teamId, memberId });
    setter.memberInfo(memberId, newMemberInfo);
  },

  async createTodoItem(teamId, memberId, contents) {
    const newTodo = await postTodoItem({ teamId, memberId, contents });
    setter.addTodoItem(memberId, newTodo);
  },

  async createTeamMember(teamId, name) {
    const newTeamMembers = await postMember({ teamId, name });
    setter.teamInfo(newTeamMembers);
  },

  async updateTodoItemComplete({ teamId, memberId, itemId }) {
    const newTodoItem = await putTodoItemComplete({ teamId, memberId, itemId });
    setter.todoItem(memberId, newTodoItem);
  },

  async updateTodoItemContents({ teamId, memberId, itemId, contents }) {
    const newTodoItem = await putTodoItemContents({ teamId, memberId, itemId, contents });
    setter.todoItem(memberId, newTodoItem);
  }
};

