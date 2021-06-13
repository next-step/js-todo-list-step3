// contents, isCompleted, priority, _id
import prioritySelect from "./prioritySelect.js";

export default {
  template : ({contents, isCompleted, priority, _id}, index) => `
  <li class="todo-list-item ${isCompleted ? 'completed' : ''}" data-index=${index}>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">
        <div class="chip-container">
          ${priority === 'NONE' ? prioritySelect.defaultTemplate : ''}
          ${priority !== 'NONE' ? prioritySelect.determinedTemplate(priority) : ''}
        </div>
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="완료된 타이틀" />
  </li>`
}