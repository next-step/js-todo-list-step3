import { teamApi, userApi } from "../api/api.js";
import TeamList from "../components/team/TeamList.js";
import MemberList from "../components/team/MemberList.js";
import TodoApp from "../components/todo/TodoApp.js";
import UserList from "../components/user/UserList.js";

export default class App {
  constructor() {
    this.containerEl = document.getElementById("container");
    this.teamData = [];
    this.appData = [];
    this.selectedUserId = "";
    this.init();
  }

  init() {
    teamApi.get().then((data) => {
      this.teamList = new TeamList({
        containerEl: this.containerEl,
        teamData: data,
        onGetTeamMembers: this.getTeamMembers.bind(this),
      });
    });
  }

  init2() {
    userApi.get().then((data) => {
      this.appData = data;
      this.selectedUserId = this.appData[0]._id;
      this.userList = new UserList({
        appData: this.appData,
        selectedUserId: this.selectedUserId,
        onSelectUser: this.selectUser.bind(this),
        onCreateUser: this.createUser.bind(this),
        onDeleteUser: this.deleteUser.bind(this),
      });
      this.todoApp = new TodoApp({
        userId: this.selectedUserId,
      });
    });
  }

  getTeamMembers = async (teamId) => {
    await teamApi.get(teamId).then((data) => {
      this.memberList = new MemberList({
        teamId,
        containerEl: this.containerEl,
        membersData: data.members,
      });
    });
  };

  getAllUser = async () => {
    await userApi.get(teamId).then((data) => {
      this.appData = data;
    });
    this.selectedUserId = this.appData[0]._id;
    this.render();
  };

  createUser = async (teamId, name) => {
    await userApi.create(teamId, name);
    this.handleGetAllUser();
  };

  selectUser = async (userId) => {
    this.selectedUserId = userId;
    this.render();
  };

  deleteUser = async (teamId, userId) => {
    await userApi.delete(teamId, userId);
    this.handleGetAllUser();
  };

  render() {
    this.userList.setState(this.appData, this.selectedUserId);
    this.todoApp.setUserId(this.selectedUserId);
  }
}
