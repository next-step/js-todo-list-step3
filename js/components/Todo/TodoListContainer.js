import Component from "../../core/component.js";
import store from '../../store/index.js';
import TodoList from "./TodoList.js";
import {getTeamToMemberToTodoList} from "../../service/TodoApi.js";
import {keyboardKey} from "../../constants/constants.js";

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
        let self = this;



        self.element.querySelectorAll('.main').forEach((node) => {
            const memberId = node.dataset.memberId;
            node.innerHTML = this.todoListUlTemplate(memberId);
        });
        const todoListInstance = new TodoList();
        todoListInstance.render();
        /*   self.element.innerHTML = '';
           self.element.innerHTML += this.todoListUlTemplate();

           if (store.state.selectedTeam.members.todoList) {
               store.state.selectedTeam.members.todoList.forEach(todo => {
                   self.element.innerHTML += this.todoListLiTemplate(todo);
               })
           }

           */


        /*
        * 포이치안에 상태값을 변경시키면 계속 무한루프가 호출된다.
        * */
    }
}