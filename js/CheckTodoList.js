import { API } from "./API.js";
import { getTeamList, $todoApps, teamId } from "./ShowTodoList.js"


export const initCheckTodoList = () => {
    $todoApps.addEventListener("click", checkItem);
}

function workCheck({ target }) {
    
    if (/(active)/.exec(window.location.href)) chooseButton("active");
    else if (/(completed)/.exec(window.location.href)) chooseButton("completed");
  }

const checkItem = async ({target}) => {
    if(!target.classList.contains('toggle')) return;

    const li = target.closest("li");
    li.classList.toggle("completed");
  
    if (target.checked) target.setAttribute("checked", "");
    else target.removeAttribute("checked");

    const memberId = target.closest('.todoapp-container').getAttribute('id');
    const itemId = target.closest('li').getAttribute('id');
    
    await API.putToggle(teamId, memberId, itemId);
    getTeamList();
};