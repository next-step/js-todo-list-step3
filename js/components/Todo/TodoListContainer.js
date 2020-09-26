import Component from "../../core/component.js";
import store from '../../store/index.js';
import {getTeamToMemberToTodoList} from "../../service/TodoApi.js";

export default class TodoListContainer extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.main')
        });
    }

    todoListUlTemplate = () => `<ul class="todo-list">
                        </ul>`

    todoListLiTemplate = (member, todoList) => `
                        <li class="todo-list-item" >
                            <div class="view">
                            </div>
                        </li>`


    render() {
        let self = this;

        self.element.innerHTML = '';
        self.element.innerHTML += this.todoListUlTemplate();

        let length = store.state.selectedTeam.members.length;

        store.state.selectedTeam.members.forEach(async member => {

            const response = await getTeamToMemberToTodoList(store.state.selectedTeam._id , member._id );
            self.element.innerHTML += this.todoListLiTemplate(response);

            console.log(response , 'response');

        })
//        store.dispatch('getMemberTodoList' , response);

        /*
        * 포이치안에 상태값을 변경시키면 계속 무한루프가 호출된다.
        * */
    }
}