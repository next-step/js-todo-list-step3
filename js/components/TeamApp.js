import TeamTitle from "./Team/TeamTitle.js";
import TeamList from "./Team/TeamList.js";
import API from "../utils/api.js";

export default function TeamApp({ elementId }) {
  this.init = async () => {
    this.state = {
      teamList: await API.getTeamList(),
    };
    this.$app = document.getElementById(elementId);

    this.teamTitle = new TeamTitle({
      $target: this.$app,
    });
    this.teamList = new TeamList({
      $target: this.$app,
      teamList: this.state.teamList,
      addTeam: this.addTeam.bind(this),
      getOneTeam: this.getOneTeam.bind(this),
    });
  };

  this.getOneTeam = async (_id) => {
    console.log(await API.getOneTeam(_id));
  };

  this.addTeam = async (name) => {
    const result = await API.addTeamList({ name });
    this.setTeam(result);
  };

  this.setTeam = (newTeam) => {
    this.state.teamList = [...this.state.teamList, newTeam];
    this.render();
  };

  this.render = () => {
    this.teamList.setState(this.state.teamList);
  };

  this.init();
}
