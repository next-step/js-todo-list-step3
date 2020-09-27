import Component from "../../core/component.js";
import store from '../../store/index.js';
import TodoList from "./TodoList.js";

export default class TodoListContainer extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.main')
        });
    }

    todoListUlTemplate = () => `<ul class="todo-list">
                        </ul>`

    todoListLiTemplate = (member) => `
                        <li class="todo-list-item" data-member-id="${member._id}" >
                            <div class="view">
                            </div>
                        </li>`


    render() {
        let self = this;

        if(self.element){

            self.element.innerHTML = '';
            self.element.innerHTML += this.todoListUlTemplate();

            store.state.selectedTeam.members.forEach(member => {
                self.element.innerHTML += this.todoListLiTemplate(member);

            })

            const todoListInstance = new TodoList();
            todoListInstance.render();

        }
        /*
        * 포이치안에 상태값을 변경시키면 계속 무한루프가 호출된다.
        * */
    }
}