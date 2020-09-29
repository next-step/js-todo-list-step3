import TeamAppTitle from "./TeamAppTitle.js";
import TeamList from "./TeamList.js";
import API from "../../utils/api.js";
import { errorCallTemplate } from "../../utils/template.js";

export default function TeamApp({ elementId }) {
  this.init = async () => {
    if (!(this instanceof TeamApp)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      teamList: await API.getTeamList()
    };
    this.$app = document.getElementById(elementId);

    this.teamTitle = new TeamAppTitle({
      $target: this.$app
    });
    this.teamList = new TeamList({
      $target: this.$app,
      teamList: this.state.teamList,
      addTeam: this.addTeam.bind(this)
    });
  };

  this.addTeam = async name => {
    const result = await API.addTeamList({ name });
    this.setTeam(result);
  };

  this.setTeam = newTeam => {
    this.state.teamList = [...this.state.teamList, newTeam];
    this.render();
  };

  this.render = () => {
    this.teamList.setState(this.state.teamList);
  };

  this.init();
}