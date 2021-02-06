import { API } from "../api.js";
import { isEnterKey, isEscKey } from "../validator.js";
import { $todoApps, teamId } from "./TodoList_DOM.js"
import { getAllTodoList } from "./showTodoList.js";

const workContentCopy = ({ target }) => {
  if (!target.classList.contains("text")) {
    return;
  }
  const li = target.closest("li");
  li.classList.add("editing");
  const chginput = li.querySelector(".edit");
  chginput.value = li.querySelector(".text").innerText;
};

const workUpdate = async ({ target, key }) => {
  const li = target.closest("li");
  if (isEscKey(key)) {
    li.classList.remove("editing");
    return;
  }
  if (isEnterKey(key)) {
    if (!target.classList.contains("edit")) return;
    const str = target.value;
    if (str.length < MINIMUN_INPUT_LENGTH) {
      alert(`${MINIMUN_INPUT_LENGTH}글자 이상 입력해주세요!`);
      return;
    }
    const memberId = target.closest(".todoapp-container").id;
    const itemId = target.closest("li").id;
    await API.putUpdate(teamId, memberId, itemId, str);

    let label = target.parentNode.querySelector(".text");
    label.innerText = target.value;
    li.classList.remove("editing");

    getAllTodoList();
  }
};

export const initUpdateTodoList = () => {
  $todoApps.addEventListener("dblclick", workContentCopy);
  $todoApps.addEventListener("keyup", workUpdate);
};
