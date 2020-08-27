import {
  teamCardContainer,
  loadingCircle,
  title,
} from "../../utils/templates.js";
import { getTeamList, addTeam, deleteTeam } from "../../apis/team.js";
import { ID_SELECTOR, CLASS_SELECTOR } from "../../utils/constants.js";

export default function Home($app) {
  this.state = {
    teamList: [],
    loading: false,
  };

  this.setState = (state) => {
    const stateKeys = Object.keys(this.state);

    stateKeys.forEach((key) => {
      if (state.hasOwnProperty(key)) {
        this.state[key] = state[key];
      }
    });

    this.render();
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
    $app.innerHTML = title();
    $app.appendChild(this.$teamListContainer);
  };

  const bindEvent = () => {
    const onClick = async (e) => {
      const $target = e.target;
      if (
        $target.id === ID_SELECTOR.ADD_TEAM_BUTTON ||
        $target.classList.contains(CLASS_SELECTOR.MATERIAL_ICONS)
      ) {
        const teamName = prompt("새로운 팀 이름을 입력해주세요");
        await addTeam(teamName);
        loadTeamList();
        return;
      }

      if ($target.classList.contains(CLASS_SELECTOR.DELETE_TEAM)) {
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

  const init = () => {
    initElements();
    loadTeamList();
    bindEvent();
    this.render();
  };

  init();
}
