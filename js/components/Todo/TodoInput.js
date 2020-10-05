import Component from "../../core/component.js";
import store from '../../store/index.js';
import {keyboardKey} from "../../constants/constants.js";
import {addTeamToMemberToTodoItem} from "../../service/TodoApi.js";

export default class TodoInput extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }

    todoInputTemplate = (memberId) => `<input class="new-todo" placeholder="할 일을 입력해주세요." data-member-id="${memberId}" autofocus />`;


    render() {

        this.element.querySelectorAll('.input-container').forEach((node) => {

            node.innerHTML = this.todoInputTemplate(node.dataset.memberId);


        });


        this.element.querySelectorAll('.new-todo').forEach((node) => {
            node.addEventListener('keyup', async ({key, target}) => {
                if (key === keyboardKey.Enter) {

                    if (target.value !== '') {
                        const response = await addTeamToMemberToTodoItem(store.state.selectedTeam._id, node.dataset.memberId ,target.value);
                        const newTodoItem = {
                            memberId : node.dataset.memberId,
                            todoList : response
                        };
                        store.dispatch('addMemberTodoItem', newTodoItem);
                        target.value = '';
                    }

                    target.value = '';
                }
            })

        });


    }
}