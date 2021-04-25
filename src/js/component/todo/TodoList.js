import { TodoItem } from "../../vo/TodoItem.js";
import { $ ,$$} from "../../util/domSelection.js";
import { Action } from "../../action/Action.js";
export class TodoList {
  constructor() {
    const $app = $("ul.todoapp-list-container");
    const teamId = $app.dataset.teamid;

    $app.addEventListener("click", async ({target}) => {
      if (!target) return;
      if (target.className == "destroy") {
        const $todoList = target.closest("li.todoapp-container");
        const memberId = $todoList.dataset.memberid;
        const targetLi = target.closest("li");
        const itemId =targetLi.dataset.itemid;
        Action.deleteItem(teamId,memberId,itemId);
      }
    });

    // app.addEventListener("click", async ({target}) => {
    //   if (!target) return;
    //   if (target.className == "toggle") {
    //     const targetLi = target.closest("li");
    //     await todoApp.updateItemState(targetLi.dataset.itemid);
    //   }
    // });

    // app.addEventListener("dblclick", ({target}) => {
    //   if (!target) return;
    //   if (target.nodeName == "LABEL") {
    //     const targetLi = target.closest("li");
    //     targetLi.classList.add("editing");
    //   }
    // });
    // app.addEventListener("keydown", async ({target,key}) => {
    //   if (!target) return;
    //   if (target.nodeName == "INPUT") {
    //     const targetLi = target.closest("li");
    //     if (key == "Escape") {
    //       targetLi.classList.remove("editing");
    //     } else if (key == "Enter") {
    //       await todoApp.updateItem(targetLi.dataset.itemid, target.value);
    //       targetLi.classList.remove("editing");
    //     }
    //   }
    // });
    // app.addEventListener("change", async ({target}) => {
    //   if (!target) return;
    //   if (target.nodeName == "SELECT" && target.classList.contains('chip')) {
    //     const targetLi = target.closest("li");
    //     const selectedIndex = target.options.selectedIndex;
    //     const priority = target.options[selectedIndex].value;
    //     await todoApp.updateItemPriority(targetLi.dataset.itemid,priority);
    //   }
    // });
  }
  render(todoList,$todoAppContainer) {
    const [list] = $$("ul.todo-list",$todoAppContainer);
    list.innerHTML = "";
    const priorityDom = {
      'NONE':`<select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`,
      'FIRST' :`<span class="chip ${TodoItem.PRIORITY_FIRST_CLASSNAME}">1순위</span>
                <select class="chip select hidden">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>`,
      'SECOND':`<span class="chip ${TodoItem.PRIORITY_SECOND_CLASSNAME}">2순위</span>
                <select class="chip select hidden">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>`,
    };

    todoList.forEach((item) => {
      const todoItemText =
      `<li class="todo-list-item ${item.isCompleted ? TodoItem.COMPLETED: TodoItem.ACTIVE}" data-itemid=${item._id}>
        <div class="view">
          <input class="toggle" type="checkbox" ${item.isCompleted ? "checked" : ""} />
          <label class="label">
            ${
              item.isCompleted ? "" :  
              item.priority == TodoItem.PRIORITY_NONE ? priorityDom.NONE :
              item.priority == TodoItem.PRIORITY_FIRST ? priorityDom.FIRST: priorityDom.SECOND
            }
            ${item.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${item.contents}" />
      </li>`;
      list.insertAdjacentHTML('beforeEnd',todoItemText);
    });
    

   
    
  }
}
