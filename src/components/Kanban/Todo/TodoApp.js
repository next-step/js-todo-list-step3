import { CLASS_SELECTOR } from "../../../utils/constants.js";
import TodoTitle from "./TodoTitle.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoDataService from "../../../TodoDataService.js";

export default function TodoApp($todoappListContainer, teamId, member) {
  const initElements = () => {
    this.$todoappContainer = document.createElement("li");
    this.$todoappContainer.classList.add(CLASS_SELECTOR.TODOAPP_CONTAINER);

    this.$todoApp = document.createElement("div");
    this.$todoApp.classList.add(CLASS_SELECTOR.TODOAPP);
  };

  this.render = () => {
    new TodoTitle(this.$todoappContainer, member.name);
    new TodoInput(this.$todoApp, this.todoDataService);
    new TodoList(this.$todoApp, this.todoDataService);
    new TodoCount(this.$todoApp, this.todoDataService);

    this.$todoappContainer.appendChild(this.$todoApp);
    $todoappListContainer.appendChild(this.$todoappContainer);
  };

  const init = () => {
    this.todoDataService = new TodoDataService(teamId, member._id);
    initElements();
    this.render();
  };

  init();
}
