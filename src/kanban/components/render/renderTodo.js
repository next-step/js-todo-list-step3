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
  return `<li id=${todo._id} class="todo-list-item ${
    todo.isCompleted ? 'completed' : ''
  }">
            <div class="view">
              <input class="toggle" type="checkbox" ${
                todo.isCompleted ? 'checked' : ''
              } />
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

export const renderTodo = async (memberId, todos = []) => {
  const $todoList = document.querySelector(
    `#${memberId} > .todoapp > .main > .todo-list`,
  );
  const $todoCount = document.querySelector(
    `#${memberId} > .todoapp > .count-container > .todo-count > strong`,
  );

  const priorityWeight = {
    FIRST: 2,
    SECOND: 1,
    NONE: 0,
  };

  $todoList.innerHTML = todos
    .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority])
    .map((todo) => todoItemTemplate(todo))
    .join('');
  $todoCount.innerText = todos.length;
};
