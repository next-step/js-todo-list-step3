import { teamApi, userApi } from "../api/api.js";
import TeamList from "../components/team/TeamList.js";
import TodoApp from "../components/todo/TodoApp.js";
import UserList from "../components/user/UserList.js";

export default class App {
  constructor() {
    this.containerEl = document.getElementById('container');
    this.appData = [];
    this.selectedUserId = "";
    this.init();
  }

  init() {
    teamApi.get().then((data) => {
      this.teamData = data;
      this.teamList = new TeamList({
        containerEl = this.containerEl,
        teamData = this.teamData
      })
    })
  }

  init2() {
    userApi.get().then((data) => {
      this.appData = data;
      this.selectedUserId = this.appData[0]._id;
      this.userList = new UserList({
        appData: this.appData,
        selectedUserId: this.selectedUserId,
        onSelectUser: this.handleSelectUser.bind(this),
        onCreateUser: this.handleCreateUser.bind(this),
        onDeleteUser: this.handleDeleteUser.bind(this),
      });
      this.todoApp = new TodoApp({
        userId: this.selectedUserId,
      });
    });
  }

  handleGetAllUser = async () => {
    await userApi.get().then((data) => {
      this.appData = data;
    });
    this.selectedUserId = this.appData[0]._id;
    this.render();
  };

  handleCreateUser = async (name) => {
    await userApi.create(name);
    this.handleGetAllUser();
  };

  handleSelectUser = async (userId) => {
    this.selectedUserId = userId;
    this.render();
  };

  handleDeleteUser = async (userId) => {
    await userApi.delete(userId);
    this.handleGetAllUser();
  };

  render() {
    this.userList.setState(this.appData, this.selectedUserId);
    this.todoApp.setUserId(this.selectedUserId);
  }
}
