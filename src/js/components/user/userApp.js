import {
  ADD_MEMBER,
  ADD_USER,
  DELETE_USER,
  GET_TEAM,
  GET_USERS,
} from "../../setting/api.js";
import { getQueryId, PATH } from "../../utils/dom.js";
import { parseTeam } from "../team/team.js";
import { parseUser } from "./user.js";
import UserEditor from "./UserEditor.js";
import UserList from "./UserList.js";
import UserTitle from "./userTitle.js";

export default function UserApp(todoApp) {
  let users = [];
  let activeTeam;
  let activeUser;

  this.render = async () => {
    const getUsers = await GET_USERS();
    users = getUsers.map((user) => parseUser(user));

    users.forEach((user) => user.inActivate());
    activeUser = activeUser ?? users[0];
    users.find((user) => user.matchId(activeUser.getId())).activate();

    this.userTitle.render(activeUser.getName());
    this.userList.render(users);
  };

  this.add = async (name) => {
    const user = await ADD_MEMBER(activeTeam.getId(), name);
    // this.render();
  };

  this.delete = async () => {
    await DELETE_USER(activeUser.getId());
    activeUser = users[0];
    changeActive();
    this.init();
  };

  this.init = async () => {
    if (location.pathname !== PATH.TEAM) return;
    activeTeam = parseTeam(await GET_TEAM(getQueryId()));
    console.log(activeTeam);
    this.userEditor = new UserEditor(this);
    this.userList = new UserList(this);
    this.userTitle = new UserTitle();
    // await this.render();
    // todoApp.init();
  };
}
