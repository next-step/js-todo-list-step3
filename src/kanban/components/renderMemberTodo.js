const priorityTemplate = (priority) => {
  const priorityClassList = {
    FIRST: 'primary',
    SECOND: 'secondary',
    NONE: '',
  };

  return `<select class="chip select ${priorityClassList[priority]}" >
            <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
            <option value="1" ${
              priority === 'FIRST' && 'selected'
            }>1순위</option>
            <option value="2" ${
              priority === 'SECOND' && 'selected'
            }>2순위</option>
          </select>`;
};

const todoItemTemplate = (todo) => {
  return `<li id=${todo._id} class="todo-list-item">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label class="label">
                <div class="chip-container">
                  ${priorityTemplate(todo.priority)}
                </div>
                ${todo.contents}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
            </li>`;
};

export const renderMemberTodo = async (teamId, memberId, todos) => {
  const $todoList = document.querySelector(
    `#${memberId} > .todoapp > .main > .todo-list`,
  );

  if (!todos) {
    return;
  }

  $todoList.innerHTML = todos.map((todo) => todoItemTemplate(todo)).join('');
};
