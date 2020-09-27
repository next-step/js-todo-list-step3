import Component from "../../core/component.js";
import store from '../../store/index.js';
import {deleteTeamToMemberToTodoItem , putTeamToMemberToTodoItemToContents} from "../../service/TodoApi.js";
import {priority, eventType, keyboardKey} from "../../constants/constants.js";

export default class TodoList extends Component {
    todoListTemplate = (memberId, {todoList}) => {
        if (todoList && todoList.length > 0) {
            return todoList.map(todo => {
                return `<li class="todo-list-item ${todo.isCompleted ? ' completed' : ''}" data-member-id="${memberId}" data-todo-id="${todo._id}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${todo.isCompleted ? 'checked' : ''} />
                                <label class="label">
                                    <div class="chip-container">
                                        <select class="chip select" data-member-id="${memberId}" data-todo-id="${todo._id}">
                                            <option value="NONE" ${todo.priority === priority.NONE ? 'selected' : ''}>순위</option>
                                            <option value="FIRST" ${todo.priority === priority.FIRST ? 'selected' : ''}>1순위</option>
                                            <option value="SECOND" ${todo.priority === priority.SECOND ? 'selected' : ''}>2순위</option>
                                        </select>
                                    </div>
                                    ${todo.contents}
                                </label>
                                <button class="destroy" data-member-id="${memberId}" data-todo-id="${todo._id}"></button>
                            </div>
                            <input class="edit" value="할일을 입력해주세요."  data-member-id="${memberId}" data-todo-id="${todo._id}"/>
                        </li>`
            }).join('');
        }
        return '할일을 입력해주세요.';
    }

    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });

    }

    render() {
        let self = this;

        this.element.querySelectorAll('.todoapp-container').forEach((node) => {
            const nodeId = node.dataset.memberId;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => nodeId === item._id);
            const $ul = node.querySelector('.todo-list');
            const template = this.todoListTemplate(nodeId, store.state.selectedTeam.members[memberIdx]);
            $ul.innerHTML = template;

        })


        this.element.querySelectorAll('.chip.select').forEach(async (node) => {
            node.addEventListener(eventType.CHANGE, async ({key, target}) => {
                console.log('change');
                /*  const memberId = node.dataset.memberId;
                  const todoId = node.dataset.todoId;
                  const deletedTodoItem = {
                      memberId,
                      todoId
                  }
                  const response = await putTeamToMemberToTodoItemToPriority(store.state.selectedTeam._id, memberId, todoId);
                  store.dispatch('deleteMemberTodoList', deletedTodoItem);
  */
            })
        })
        this.element.querySelectorAll('.toggle').forEach(async (node) => {
            node.addEventListener(eventType.CHANGE, async ({key, target}) => {
                console.log('change,toggle');
                /*const memberId = node.dataset.memberId;
                const todoId = node.dataset.todoId;
                const deletedTodoItem = {
                    memberId,
                    todoId
                }
                const response = await putTeamToMemberToTodoItemToPriority(store.state.selectedTeam._id, memberId, todoId);
                store.dispatch('deleteMemberTodoList', deletedTodoItem);
*/
            })
        })
        this.element.querySelectorAll('.destroy').forEach(async (node) => {
            node.addEventListener(eventType.CLICK, async ({key, target}) => {
                const memberId = node.dataset.memberId;
                const todoId = node.dataset.todoId;
                const deletedTodoItem = {
                    memberId,
                    todoId
                }
                const response = await deleteTeamToMemberToTodoItem(store.state.selectedTeam._id, memberId, todoId);
                store.dispatch('deleteMemberTodoList', deletedTodoItem);

            })
        })
        this.element.querySelectorAll('.label').forEach(async (node) => {
            node.addEventListener(eventType.DOUBLE_CLICK, async ({key, target}) => {
                const $li = node.closest('.todo-list-item');
                $li.className = 'todo-list-item editing';
            })
        })
        this.element.querySelectorAll('.edit').forEach(async (node) => {
            node.addEventListener(eventType.KEY_UP, async ({key, target}) => {
                if (key === keyboardKey.Enter) {
                    if (target.value !== '') {
                        const response = await putTeamToMemberToTodoItemToContents(store.state.selectedTeam._id, node.dataset.memberId,node.dataset.todoId, target.value);
                        const newTodoItem = {
                            memberId: node.dataset.memberId,
                            todoList: response
                        };
                        store.dispatch('putMemberTodoItemContents', newTodoItem);
                        target.value = '';
                        const $li = node.closest('.todo-list-item');
                        console.log($li);
                        $li.className = `todo-list-item ${response.isCompleted ? ' completed' : ''}`;
                    }

                    target.value = '';
                }
            })
        })
    }
}