import todoInput from "./todoInput.js";
import todoTitle from "./todoTitle.js";
import todoListContainer from "./todoList.js";
import todoCount from "./todoCount.js";
import { ALL, PRIORITY } from "../../../constant/constant.js";
import { compareByPriority } from '../../../utils/utils.js';

export default {
  template: ({ name, todoList=[], filter }, index) => {
    const filteredList = filter === ALL || filter === ALL + PRIORITY ? 
    [...todoList] : todoList.filter((item) => item.isCompleted == filter || 
    item.isCompleted + PRIORITY == filter);
    filter >= PRIORITY && filteredList.sort(compareByPriority);
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