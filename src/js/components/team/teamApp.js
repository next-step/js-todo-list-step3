import { ADD_TEAM } from "../../setting/api.js";
import TeamEditor from "./teamEditor.js";
import TeamList from "./teamList.js";

export default function TeamApp(userApp) {
  new TeamList(this);
  new TeamEditor(this);
  let teams = [];

  this.add = async (name) => {
    const team = await ADD_TEAM(name);
    console.log(team);
  };
}
