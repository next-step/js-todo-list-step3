import {
  teamCardContainer,
  loadingCircle,
  indexTitle,
} from "../../utils/templates.js";
import { getTeamList, addTeam, deleteTeam } from "../../apis/team.js";
import { ID_SELECTOR, CLASS_SELECTOR } from "../../utils/constants.js";
import {
  checkMoreThanOneClassContain,
  isArray,
  isBoolean,
} from "../../utils/validator.js";

export default function Home($app) {
  this.state = {
    teamList: [],
    loading: true,
  };

  this.setState = ({ teamList, loading }) => {
    if (isArray(teamList)) {
      this.state.teamList = teamList;
    }

    if (isBoolean(loading)) {
      this.state.loading = loading;
    }

    this.render();
  };

  const initElements = () => {
    this.$teamListContainer = document.createElement("div");
    this.$teamListContainer.classList.add(CLASS_SELECTOR.TEAM_LIST_CONTAINER);

    this.$addTeamButtonContainer = document.createElement("div");
    this.$addTeamButtonContainer.classList.add(
      CLASS_SELECTOR.ADD_TEAM_BUTTON_CONTAINER
    );

    this.$addTeamButton = document.createElement("button");
    this.$addTeamButton.id = ID_SELECTOR.ADD_TEAM_BUTTON;
    this.$addTeamButton.classList.add(CLASS_SELECTOR.RIPPLE);

    this.$materialIcons = document.createElement("span");
    this.$materialIcons.classList.add(CLASS_SELECTOR.MATERIAL_ICONS);
    this.$materialIcons.textContent = "add";

    this.$addTeamButton.appendChild(this.$materialIcons);
    this.$addTeamButtonContainer.appendChild(this.$addTeamButton);
    this.$teamListContainer.appendChild(this.$addTeamButtonContainer);
    $app.innerHTML = indexTitle();
    $app.appendChild(this.$teamListContainer);
  };

  const loadTeamList = async () => {
    try {
      this.setState({ loading: true });
      const teamList = await getTeamList();
      this.setState({ teamList });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  const addTeamByPrompt = async () => {
    const teamName = prompt("새로운 팀 이름을 입력해주세요");

    if (teamName) {
      await addTeam(teamName);
      loadTeamList();
    }
  };

  const bindEvent = () => {
    const onClick = async (e) => {
      const $target = e.target;
      if (
        $target.id === ID_SELECTOR.ADD_TEAM_BUTTON ||
        checkMoreThanOneClassContain($target, CLASS_SELECTOR.MATERIAL_ICONS)
      ) {
        addTeamByPrompt();
        return;
      }

      if (checkMoreThanOneClassContain($target, CLASS_SELECTOR.DELETE_TEAM)) {
        e.preventDefault();
        const $teamCardContainer = $target.closest(
          `.${CLASS_SELECTOR.TEAM_CARD_CONTAINER}`
        );
        const teamId = $teamCardContainer.dataset.teamId;
        await deleteTeam(teamId);
        loadTeamList();
      }
    };

    this.$teamListContainer.addEventListener("click", onClick);
  };

  this.render = () => {
    if (this.state.loading) {
      this.$teamListContainer.innerHTML = loadingCircle();
      return;
    }

    this.$teamListContainer.innerHTML = this.state.teamList
      .map((team) => teamCardContainer(team))
      .join("");
    this.$teamListContainer.appendChild(this.$addTeamButtonContainer);
  };

  const init = () => {
    initElements();
    loadTeamList();
    bindEvent();
    this.render();
  };

  init();
}
