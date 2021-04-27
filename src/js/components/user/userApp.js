import { ADD_MEMBER } from "../../setting/api.js";
import { getQueryId, PATH } from "../../utils/dom.js";
import UserEditor from "./UserEditor.js";

export default function UserApp(todoApp) {
  this.render = () => {
    todoApp.render();
  };

  this.add = async (name) => {
    const user = await ADD_MEMBER(this.teamId, name);
    this.render();
  };

  this.init = async () => {
    if (location.pathname !== PATH.TEAM) return;
    this.teamId = getQueryId();
    this.userEditor = new UserEditor(this);
    todoApp.init(this.teamId);
  };
}
