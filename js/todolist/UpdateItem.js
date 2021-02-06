import { API, MINIMUN_INPUT_LENGTH } from "../api.js";
import { getAllTodoList, $todoApps, teamId } from "./showTodoList.js";

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
  if (key === "Escape") {
    li.classList.remove("editing");
    return;
  }
  if (key === "Enter") {
    if (!target.classList.contains("edit")) return;
    const str = target.value;
    if (str.length < MINIMUN_INPUT_LENGTH) {
      alert(`${MINIMUN_INPUT_LENGTH}글자 이상 입력해주세요!`);
      return;
    }
    const memberId = target.closest(".todoapp-container").getAttribute("id");
    const itemId = target.closest("li").getAttribute("id");
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
