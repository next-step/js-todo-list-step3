import { deleteTodo } from "../../../../serverAPI/user/deleteTodo.js";
import { animationToggler } from "../animationToggler.js";
import { updateCountText } from "../updateCountText.js";

/* 만약 drawTodo.js에서 실제로 HTML 요소를 생성할 때 버튼에 이벤트 리스너를
 등록해주는 식으로 변경된다면 이 onClickTodoList.js는 필요가 없다. 
 하지만 이미 이벤트 위임을 활용하는 방향으로 구현하고 있기 때문에 일관성을 유지하도록 한다.*/
function isDestroyButton(target) {
  return target.nodeName === "BUTTON" && target.classList.contains("destroy");
}

export async function onClickTodoList(event) {
  // event.preventDefault(); makes checkbox toggle css not working.
  const targetNode = event.target;

  if (targetNode.closest("li") === undefined) return;
  const clickedTodoID = targetNode.closest("li.todo-list-item").id;
  const userID = targetNode.closest("li.todoapp-container").id;
  const teamID = localStorage.getItem("teamID");

  if (isDestroyButton(targetNode)) {
    const toggler = animationToggler(targetNode);
    toggler();
    if ((await deleteTodo(teamID, userID, clickedTodoID)) !== null) {
      toggler();
      targetNode.closest("li.todo-list-item").remove();
    }
    updateCountText(userID);
  }
}
