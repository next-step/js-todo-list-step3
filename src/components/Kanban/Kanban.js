import { kanbanTitle, loadingCircle } from "../../utils/templates.js";
import { ID_SELECTOR, CLASS_SELECTOR } from "../../utils/constants.js";
import { addMember, getTeam } from "../../apis/team.js";
import TodoApp from "./Todo/TodoApp.js";
import {
  checkMoreThanOneClassContain,
  isArray,
  isBoolean,
} from "../../utils/validator.js";

export default function Kanban($app, teamId) {
  this.state = {
    members: [],
    loading: true,
  };

  this.setState = ({ members, loading }) => {
    if (isArray(members)) {
      this.state.members = members;
    }

    if (isBoolean(loading)) {
      this.state.loading = loading;
    }

    this.render();
  };

  const initElements = () => {
    this.$kanbanTitle = document.createElement("h1");

    this.$todoappListContainer = document.createElement("ul");
    this.$todoappListContainer.classList.add(
      CLASS_SELECTOR.TODOAPP_LIST_CONTAINER,
      CLASS_SELECTOR.FLEX_COLUMN_CONTAINER
    );

    this.$addUserButtonContainer = document.createElement("li");
    this.$addUserButtonContainer.classList.add(
      CLASS_SELECTOR.ADD_USER_BUTTON_CONTAINER
    );

    this.$addUserButton = document.createElement("button");
    this.$addUserButton.id = ID_SELECTOR.ADD_USER_BUTTON;
    this.$addUserButton.classList.add(CLASS_SELECTOR.RIPPLE);

    this.$materialIcons = document.createElement("span");
    this.$materialIcons.classList.add(CLASS_SELECTOR.MATERIAL_ICONS);
    this.$materialIcons.textContent = "add";

    this.$addUserButton.appendChild(this.$materialIcons);
    this.$addUserButtonContainer.appendChild(this.$addUserButton);
    this.$todoappListContainer.appendChild(this.$addUserButtonContainer);

    $app.appendChild(this.$kanbanTitle);
    $app.appendChild(this.$todoappListContainer);
  };

  const loadTeam = async () => {
    try {
      this.setState({ loading: true });
      const team = await getTeam(teamId);
      this.$kanbanTitle.innerHTML = kanbanTitle(team.name);
      this.setState({ members: team.members });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };

  const addMemberByPrompt = async () => {
    const name = prompt("새로운 팀원 이름을 입력해주세요");
    if (name) {
      await addMember(teamId, name);
      loadTeam();
    }
  };

  const bindEvent = () => {
    const onClick = async ({ target: $target }) => {
      if (
        $target.id === ID_SELECTOR.ADD_USER_BUTTON ||
        checkMoreThanOneClassContain($target, CLASS_SELECTOR.MATERIAL_ICONS)
      ) {
        addMemberByPrompt();
        return;
      }
    };

    this.$addUserButtonContainer.addEventListener("click", onClick);
  };

  this.render = () => {
    this.$todoappListContainer.innerHTML = "";

    if (this.state.loading) {
      this.$todoappListContainer.innerHTML = loadingCircle();
      return;
    }

    this.state.members.forEach(
      (member) => new TodoApp(this.$todoappListContainer, teamId, member)
    );

    this.$todoappListContainer.appendChild(this.$addUserButtonContainer);
  };

  const init = () => {
    initElements();
    loadTeam();
    bindEvent();
    this.render();
  };

  init();
}
