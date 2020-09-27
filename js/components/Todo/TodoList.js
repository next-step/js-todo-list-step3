import Component from "../../core/component.js";
import store from '../../store/index.js';
import {getTeamToMemberToTodoList} from "../../service/TodoApi.js";
import {priority} from "../../constants/constants.js";

export default class TodoList extends Component {
    todoListTemplate = ( memberId,{todoList}) => {
        if (todoList && todoList.length > 0) {
            return todoList.map(todo => {
                return`<li class="todo-list-item ${todo.isCompleted ? ' completed': ''}" data-todo-id="${todo._id}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${todo.isCompleted ? 'checked': ''} />
                                <label class="label">
                                    <div class="chip-container">
                                        <select class="chip select" data-member-id="${memberId}" data-todo-id="${todo._id}">
                                            <option value="NONE" ${todo.priority === priority.NONE ? 'selected' :''}>순위</option>
                                            <option value="FIRST" ${todo.priority === priority.FIRST ? 'selected' :''}>1순위</option>
                                            <option value="SECOND" ${todo.priority === priority.SECOND ? 'selected' :''}>2순위</option>
                                        </select>
                                    </div>
                                    ${todo.contents}
                                </label>
                                <button class="destroy" data-member-id="${memberId}"></button>
                            </div>
                            <input class="edit" value="완료된 타이틀" />
                        </li>`}).join('');
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

        this.element.querySelectorAll('.todoapp-container').forEach( (node) => {
            const nodeId = node.dataset.memberId;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => nodeId === item._id);
            const $ul = node.querySelector('.todo-list');
            const template=  this.todoListTemplate(nodeId ,store.state.selectedTeam.members[memberIdx]);
            $ul.innerHTML = template;

        })




    }
}