import {
  getTeams,
  getTeam,
  getMember,
  deleteTodoItem,
  postTodoItem,
  postMember,
  putTodoItemComplete,
  putTodoItemContents,
  putTodoItemPriority,
  deleteAllTodoList,
} from '../endpoint/team/controller.js';
import { useFamily, useState } from '../lib/state.js';

const [teamName, setTeamName] = useState('team');
const [teamList, setTeamList] = useState([]);
const [teamID, setTeamID] = useState('');
const [teamMembers, setTeamMembers] = useFamily('_id');

export const getter = {
  teamList, teamName, teamID, teamMembers,

  memberById(memberId) {
    const [getMember, ] = getter.teamMembers().get(memberId);
    return getMember();
  },
  memberTodoList(memberId) {
    const [getMember, ] = getter.teamMembers().get(memberId);
    return [...getMember().todoList]; // 불변성 관리가 필요해짐! 불변성이 필요한곳을 탐색해보자 todoList sort 를 하는 부분에서 영감을!
  }
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

  updateTodoItem(memberId, newTodo) {
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

  updateTodoList(memberId, todoList) {
    const [getMember, setMember] = getter.teamMembers().get(memberId);
    const member = getMember();

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
    setter.updateTodoItem(memberId, newTodoItem);
  },

  async updateTodoItemContents({ teamId, memberId, itemId, contents }) {
    const newTodoItem = await putTodoItemContents({ teamId, memberId, itemId, contents });
    setter.updateTodoItem(memberId, newTodoItem);
  },

  async updateTodoItemPriority({ teamId, memberId, itemId, priority }) {
    const newTodoItem = await putTodoItemPriority({ teamId, memberId, itemId, priority });
    setter.updateTodoItem(memberId, newTodoItem);
  },

  async removeAllTodoList({ teamId, memberId }) {
    await deleteAllTodoList({ teamId, memberId });
    await dispatch.readMemberInfo(teamId, memberId);
  },
};

