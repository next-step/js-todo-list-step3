import { validateInstance, isBoolean, validateTeams } from "../utils.js";
import Loader from "./Loader.js";
import api from "../api.js";

function TeamList($target) {
  validateInstance(TeamList, this);
  this.$target = $target;

  this.state = {
    teams: [],
    isLoading: false,
  };

  this.setState = (state) => {
    if (isBoolean(state?.isLoading)) {
      this.state.isLoading = state.isLoading;
    }

    if (state?.teams) {
      validateTeams(state.teams);
      this.state.teams = state.teams;
    }

    this.render();
  };

  this.loadTeams = async () => {
    try {
      this.setState({ isLoading: true });
      const teams = await api.fetchTeams();
      validateTeams(teams);
      this.state.teams = teams;
    } catch (error) {
      console.log(error);
      this.state.teams = [];
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.initEventListeners = () => {
    const onClickHandler = async (event) => {
      if (event.target.classList.contains("ripple")) {
        const newTeamName = prompt("팀 이름을 입력해주세요");
        if (!newTeamName) {
          return;
        }
        try {
          this.setState({ isLoading: true });
          const newTeam = await api.addTeam(newTeamName);
          this.state.teams.push(newTeam);
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }

      if (event.target.classList.contains("destroy")) {
        const id = event.target.closest(".team-card-container")?.dataset?.id;
        if (!id) {
          return;
        }

        const teamIdx = this.state.teams.findIndex(({ _id }) => _id === id);
        if (teamIdx === -1) {
          console.log(`Can't find team with id ${id}`);
          return;
        }

        try {
          this.setState({ isLoading: true });
          await api.deleteTeamById(id);
          this.state.teams.splice(teamIdx, 1);
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }
    };

    this.$target.addEventListener("click", onClickHandler);
  };

  this.render = () => {
    const teamsHTML = this.state.teams
      .map(
        ({ _id, name }) => `
        <div class="team-card-container" data-id=${_id}>
          <a href="/kanban.html?$id=${_id}" class="card">
            <div class="card-title">${name}</div>
          </a>
          <button class="destroy"></button>
        </div>`
      )
      .join(" ");

    this.$target.innerHTML = this.state.isLoading
      ? Loader
      : ` 
          <div class="team-list-container">
            ${teamsHTML}
            <div class="add-team-button-container">
            <button id="add-team-button" class="ripple">
                <span class="material-icons">add</span>
            </button>
            </div>
          </div>
      `;
  };
  this.initEventListeners();
  this.render();
  this.loadTeams();
}

export default TeamList;
