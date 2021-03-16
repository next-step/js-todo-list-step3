import { updatePriority } from "../../../../serverAPI/user/updatePriority.js";
import { updateTodo } from "../../../../serverAPI/user/updateTodo.js";
import { toggleTodo } from "../../../../serverAPI/user/toggleTodo.js";
import { animationToggler } from "../animationToggler.js";
import { updateCountText } from "../updateCountText.js";
import { applySelectedFilter } from "../filters/filterRules.js";

function isEditingInput(target) {
  return target.nodeName === "INPUT" && target.classList.contains("edit");
}

function isPrioritySelect(target) {
  return target.nodeName === "SELECT" && target.classList.contains("select");
}

function isCompletedCheckbox(target) {
  return target.nodeName === "INPUT" && target.classList.contains("toggle");
}

export async function onChangeTodoList({ target }) {
  if (
    !isEditingInput(target) &&
    !isPrioritySelect(target) &&
    !isCompletedCheckbox(target)
  )
    return;
  const clickedTodoID = target.closest("li.todo-list-item").id;
  const userID = target.closest("li.todoapp-container").id;
  const teamID = localStorage.getItem("teamID");

  const toggler = animationToggler(target);
  toggler();

  if (isEditingInput(target)) {
    if (target.value.trim().length < 1) {
      alert("Please enter at least 1 character.");
    } else {
      target.toggleAttribute("disabled");
      const updatedTodo = await updateTodo(
        teamID,
        userID,
        clickedTodoID,
        target.value.trim()
      );
      // not target.parent, it's target.parentNode.
      target.parentNode.querySelector(
        "label.label div.chip-container"
      ).nextSibling.textContent = updatedTodo.contents;
      target.toggleAttribute("disabled");
      target.closest("li.todo-list-item").classList.toggle("editing");
    }
  } else if (isPrioritySelect(target)) {
    const updatedValue =
      target.value === "0" ? "NONE" : target.value === "1" ? "FIRST" : "SECOND";

    const updatedTodo = await updatePriority(
      teamID,
      userID,
      clickedTodoID,
      updatedValue
    );
    target.classList.remove("primary", "secondary");
    switch (updatedTodo.priority) {
      case "FIRST":
        target.classList.add("primary");
        break;

      case "SECOND":
        target.classList.add("secondary");
        break;
    }
  } else if (isCompletedCheckbox(target)) {
    // checkbox change event can be, and should be handled on CHANGE event!!

    /* 현재 체크박스가 변경되는 이벤트를 감지하기 때문에 실제 할 일의 상태와
       사용자측의 체크박스 상태가 짧은 시간 어긋날 수 있다. 이는 클릭 이벤트에서
       서버측 응답에 따라 checked 속성을 추가/제거하는 방식으로 처리하면 해결되겠지만
       이번에는 change 이벤트를 사용해본다. --> 2주차의 애니메이션 div를 활용하여 가림.*/
    const result = await toggleTodo(teamID, userID, clickedTodoID);
    if (result.isCompleted) {
      target.setAttribute("checked", "");
      target.closest("li").classList.add("completed");
    } else {
      target.removeAttribute("checked");
      target.closest("li").classList.remove("completed");
    }
  }

  applySelectedFilter(userID);
  updateCountText(userID);
  toggler();
}
