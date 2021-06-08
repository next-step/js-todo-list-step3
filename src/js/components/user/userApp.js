import { ADD_MEMBER, GET_TEAM } from "../../setting/api.js";
import { getQueryId, PATH } from "../../utils/dom.js";
import { parseTeam } from "../team/team.js";
import TeamTitle from "../team/teamTitle.js";
import { parseUser } from "./user.js";
import UserEditor from "./UserEditor.js";
import UserList from "./userList.js";

export default function UserApp(todoApp) {
  this.render = async () => {
    await fetch();
    this.teamTitle.render(this.team.getName());
    this.memberList.render(this.members);
    this.userEditor.render();
    todoApp.render(this.members);
  };

  const fetch = async () => {
    const team = await GET_TEAM(this.teamId);
    this.team = parseTeam(team);
    const members = this.team.getMembers();
    this.members = members ? members.map((member) => parseUser(member)) : [];
  };

  this.add = async (name) => {
    await ADD_MEMBER(this.teamId, name);
    this.render();
  };

  this.init = () => {
    if (location.pathname !== PATH.TEAM) return;
    this.teamId = getQueryId();
    this.userEditor = new UserEditor(this);
    this.memberList = new UserList();
    this.teamTitle = new TeamTitle();
    todoApp.init(this.teamId);
    this.render();
  };
}
