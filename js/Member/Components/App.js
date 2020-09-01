import {
  validateInstance,
  getUrlParams,
  validateTeam,
  isBoolean,
} from "../../Common/utils.js";
import Title from "./Title.js";
import api from "../../Common/api.js";
import TodoAppList from "./TodoAppList.js";

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
    this.initComponents();
  };

  this.loadTeam = async () => {
    try {
      const params = getUrlParams();
      const team = await api.fetchTeamById(params?.id);
      this.setState({ team });
    } catch (error) {
      console.log(error);
    }
    console.log(this.state.team);
  };

  this.initComponents = () => {
    this.teamTitle = new Title(
      document.querySelector("#team-title"),
      this.state.team.name
    );
    this.todoAppList = new TodoAppList(
      document.querySelector(".todoapp-list-container"),
      this.state.team.members
    );
  };

  this.initEventListeners = () => {};

  this.render = () => {
    this.$target.innerHTML = `
      <h1 id="team-title"></h1>
      <ul class="todoapp-list-container flex-column-container"></ul>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
  this.loadTeam();
}

export default App;
