import Component from "../../core/component.js";
import store from '../../store/index.js';
import UserTitle from "./UserTitle.js";
import UserAddButton from "./UserAddButton.js";
import TodoInput from "./TodoInput.js";
import TodoListContainer from "./TodoListContainer.js";

export default class UserListContainer extends Component {
    todoUserContainerTemplate = ({_id}) =>
        `<li class="todoapp-container" data-member-id="${_id}">
                <section class="user-name-container" data-member-id="${_id}">
                </section>
                  <div class="todoapp">
                    <section class="input-container" data-member-id="${_id}">
                    </section>
                    <section class="main" data-member-id="${_id}" >
                    </section>
                    <div class="count-container"  data-member-id="${_id}" >
                    </div>
                </div>
            </li>`;
    userAddContainerTemplate = () => `
        <li class="add-user-button-container">
            </li>`

    constructor(element) {
        super({
            store,
            element
        });
    }


    teamTitleTemplate = (teamName) => {
        return `<span><strong>${teamName}</strong>'s Todo List</span>`;
    }

    render() {
        this.element.innerHTML = '';
        let template = '';
        store.state.selectedTeam.members.forEach(member => {
            template += this.todoUserContainerTemplate(member);
        })
        template += this.userAddContainerTemplate();

        this.element.innerHTML = template;
        const TodoListContainerInstance = new TodoListContainer(document.querySelector('.todoapp-list-container.flex-column-container'));
        const userTitleInstance = new UserTitle(document.querySelector('.todoapp-list-container.flex-column-container'));
        const TodoInputInstance = new TodoInput( document.querySelector('.todoapp-list-container.flex-column-container'));
        const userAddButtonInstance = new UserAddButton(document.querySelector('.add-user-button-container'));
        TodoListContainerInstance.render();
        userTitleInstance.render();
        TodoInputInstance.render();
        userAddButtonInstance.render();


    }
}