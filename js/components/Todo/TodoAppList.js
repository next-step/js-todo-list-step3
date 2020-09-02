import {
  TODO_APP_LIST_CONTAINER,
  TODO_APP_CONTAINER,
  FLEX_COLUMN_CONTAINER,
  ADD_USER_BTN_CONTAINER,
} from "../../utils/data.js";
import TodoTitle from "./TodoTitle.js";
import TodoApp from "./TodoApp.js";
import API from "../../utils/api.js";
import { errorCallTemplate } from "../../utils/template.js";
import TeamTitle from "./TeamTitle.js";
import { urlHrefClear } from "../../utils/util.js";

export default function TodoAppList({ elementId }) {
  if (!(this instanceof TodoAppList)) {
    throw new Error(errorCallTemplate);
  }
  urlHrefClear();
  const currentID = location.href.split("id=")[1];

  this.init = async () => {
    const currentTeam = await API.getOneTeam(currentID);
    this.$kanbanApp = document.getElementById(elementId);

    this.state = {
      _id: currentTeam._id,
      name: currentTeam.name,
      members: currentTeam.members,
    };

    this.teamTitle = new TeamTitle({
      $target: this.$kanbanApp,
      teamName: this.state.name,
    });

    this.$todoAppList = document.createElement("ul");
    this.$todoAppList.classList.add(TODO_APP_LIST_CONTAINER);
    this.$todoAppList.classList.add(FLEX_COLUMN_CONTAINER);
    this.$kanbanApp.appendChild(this.$todoAppList);

    this.renderAddBtn();
    this.render();
  };

  this.renderAddBtn = () => {
    this.$addBtnContainer = document.createElement("li");
    this.$addBtnContainer.classList.add(ADD_USER_BTN_CONTAINER);
    this.$addBtnContainer.innerHTML = `
      <button id="add-user-button" class="ripple">
        <span class="material-icons">add</span>
      </button>
    `;
    this.$todoAppList.appendChild(this.$addBtnContainer);
    this.$addBtnContainer.addEventListener("click", this.clickHandler);
  };

  this.clickHandler = async (evt) => {
    const result = prompt("새로운 팀원 이름을 입력해주세요");
    (await result) &&
      api.addTeamMember(this.state._id, {
        name: result,
      });
  };

  this.render = () => {
    this.state.members.forEach(({ name, todoList, _id }) => {
      const $todoAppContainer = document.createElement("li");
      $todoAppContainer.classList.add(TODO_APP_CONTAINER);
      $todoAppContainer.setAttribute("id", _id);
      new TodoTitle({
        $target: $todoAppContainer,
        teamName: name,
      });
      new TodoApp({
        $target: $todoAppContainer,
        todoList,
      });
      this.$todoAppList.insertBefore($todoAppContainer, this.$addBtnContainer);
    });
  };
  this.init();
}
