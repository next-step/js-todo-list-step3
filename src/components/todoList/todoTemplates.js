export const priorityTemplate = (priority) => {
    const priorityList = {
        FIRST : 'primary',
        SECOND : 'secondary',
        NONE : '',
    }
    return `<select class="chip select ${priorityList[priority]}">
                <option value="0" ${priority === 'NONE' ? 'selected' : ''}>순위</option>
                <option value="1" ${priority === 'FIRST' ? 'selected' : ''}>1순위</option>
                <option value="2" ${priority === 'SECOND' ? 'selected' : ''}>2순위</option>
            </select>`;
};

export const todoListTemplate =(todo, memberId) => {
    return `<li id='${todo._id}' class='${todo.contents} ${todo.isCompleted ? 'completed' : ''}'>
                <div class="view">
                <input id="${memberId}" class="toggle" type="checkbox" ${todo.isCompleted ? 'checked' : ''}/>
                <label class="label">
                    ${priorityTemplate(todo.priority)}
                    ${todo.contents}
                </label>
                <button id="${memberId}" class="destroy"></button>
                </div>
                <input class="edit" value="${todo.contents}" />
            </li>`;
};


export const todoAppContainerTemplate = (memberId,memberName) => {
    return `<li id="${memberId}" class="todoapp-container">
                <h2>
                <span><strong>${memberName}</strong>'s Todo List</span>
                </h2>

                <div class="todoapp">
                <section class="input-container">
                    <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
                </section>

                <section class="main">
                    <ul class="todo-list">
            
                    </ul>
                </section>

                <div class="count-container">
                    <span class="todo-count">총 <strong>0</strong> 개</span>
                    <ul id="${memberId}"class="filters">
                    <li> <a href="#all" id="all" class="all selected"> 전체보기 </a> </li>
                    <li> <a href="#priority" id="priority" class="priority"> 우선 순위 </a> </li>
                    <li> <a href="#active" id="active" class="active"> 해야할 일 </a> </li>
                    <li> <a href="#completed" id="completed" class="completed"> 완료한 일 </a> </li>
                    </ul>
                    <button class="clear-completed">모두 삭제</button>
                </div>
                </div>
            </li>`;
};

export const addUserButtonTemplate = () => {
    return `<li class="add-user-button-container">
                <button id="add-user-button" class="ripple">
                <span class="material-icons">add</span>
                </button>
            </li>`;
};