import {
  validateInstance,
  getUrlParams,
  validateTeam,
  isBoolean,
} from "../../Common/utils.js";
import Title from "./Title.js";
import TodoAppList from "./TodoAppList.js";
import teamAPI from "../../Common/api/teamAPI.js";
import Loader from "../../Common/Components/Loader.js";

function App($target) {
  validateInstance(App, this);
  this.$target = $target;
  this.state = {
    team: { _id: "dummy", members: [], name: "Team" },
    isLoading: false,
  };

  this.setState = (state) => {
    if (state?.team) {
      validateTeam(state.team);
      this.state.team = state.team;
    }

    if (isBoolean(state?.isLoading)) {
      this.state.isLoading = state.isLoading;
    }

    this.render();

    if (this.state.isLoading) {
      return;
    }

    this.initComponents();
  };

  this.loadTeam = async () => {
    try {
      this.setState({ isLoading: true });
      const params = getUrlParams();
      const team = await teamAPI.fetchTeamById(params?.id);
      this.setState({ team });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
    console.log(this.state.team);
  };

  this.initComponents = () => {
    this.teamTitle = new Title(
      document.querySelector("#team-title"),
      this.state.team.name
    );
    this.todoAppList = new TodoAppList(
      document.querySelector("#todoapp-list"),
      this.state.team
    );
  };

  this.initEventListeners = () => {};

  this.render = () => {
    this.$target.innerHTML = this.state.isLoading
      ? Loader
      : `
      <h1 id="team-title"></h1>
      <section id="todoapp-list"></section>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
  this.loadTeam();
}

export default App;
