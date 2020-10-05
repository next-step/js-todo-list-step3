import Component from "../../core/component.js";
import store from '../../store/index.js';
import TodoList from "./TodoList.js";
import {getTeamToMemberToTodoList} from "../../service/TodoApi.js";
import {keyboardKey} from "../../constants/constants.js";
import TodoFooter from "./TodoFooter.js";

export default class TodoListContainer extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }

    todoListUlTemplate = (memberId) => `<ul class="todo-list" data-member-id="${memberId}" >
                        </ul>`

    todoListLiTemplate = (todo) => `
                        <li class="todo-list-item" data-todo-id="${todo._id}">
           
                        </li>`


    render() {


        this.element.querySelectorAll('.main').forEach((node) => {
            const memberId = node.dataset.memberId;
            node.innerHTML = this.todoListUlTemplate(memberId);
        });
        const todoListInstance = new TodoList();
        const todoFooterInstance = new TodoFooter();


        todoListInstance.render();
        todoFooterInstance.render();


        /*
        * 포이치안에 상태값을 변경시키면 계속 무한루프가 호출된다.
        * */
    }
}