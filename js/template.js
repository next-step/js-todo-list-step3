export const teamItemTemplate = item => (
  `<div class="team-card-container">
    <a href="/kanban.html?id=${item._id}" class="card">
      <div class="card-title">
        ${item.name}
      </div>
    </a>
  </div>`
);

export const teamAddItemTemplate = () => (
  `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`
);

export const todoItemTemplate = item => (
  `<li id="${item._id}" class="${item.isCompleted ? 'completed' : ''} ${item.editing ? 'editing' : ''}">
    <div class="view">
      <input class="toggle" type="checkbox" ${item.isCompleted ? 'checked' : ''}/>
      <label class="label">
        ${item.chipSelected ?
    item.priority ? `<span class="chip primary">1순위</span>` : `<span class="chip secondary">2순위</span>` :
    `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>`
  }
        ${item.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
  </li>`
);

export const userItemTemplate = item => (
  `<button class="ripple">${item.name}</button>`
);