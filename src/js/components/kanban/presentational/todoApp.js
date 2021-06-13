import todoInput from "./todoInput.js";
import todoTitle from "./todoTitle.js";
import todoListContainer from "./todoList.js";
import todoCount from "./todoCount.js";
import { ALL } from "../../../constant/constant.js";

export default {
  template: ({ name, _id, todoList=[], filter }, index) => {
    const filteredList = filter === ALL ? todoList : todoList.filter((item) => item.isCompleted == filter);
    // filter >= PRIORITY && filteredList.sort(priority);
    return `
      <li class="todoapp-container" data-index=${index}>
        ${todoTitle.template(name)}
        <div class="todoapp">
          ${todoInput.template}
          <section class="main">
            ${todoListContainer.template(filteredList)}
          </section>
          ${todoCount.template(filteredList.length, filter)}
        </div>
      </li>
      `
  }
}