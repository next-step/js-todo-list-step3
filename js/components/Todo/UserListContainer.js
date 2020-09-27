import Component from "../../core/component.js";
import store from '../../store/index.js';
import UserTitle from "./UserTitle.js";
import UserAddButton from "./UserAddButton.js";
import TodoInput from "./TodoInput.js";
import TodoListContainer from "./TodoListContainer.js";

export default class UserListContainer extends Component {
    todoUserContainerTemplate = ({_id}) =>
        `<li class="todoapp-container" data-team-id="${_id}">
                <section class="user-name-container" data-team-id="${_id}">
                </section>
                  <div class="todoapp">
                    <section class="input-container">
                    </section>
                    <section class="main" data-team-id="${_id}" >
                    </section>
                </div>
            </li>`;
    userAddContainerTemplate = () => `
        <li class="add-user-button-container">
            </li>`

    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }


    teamTitleTemplate = (teamName) => {
        return `<span><strong>${teamName}</strong>'s Todo List</span>`;
    }

    render() {
        let self = this;
        self.element.innerHTML = '';
        store.state.selectedTeam.members.forEach(member => {
            self.element.innerHTML += this.todoUserContainerTemplate(member);
        })
        self.element.innerHTML+= this.userAddContainerTemplate();

        const TodoListContainerInstance = new TodoListContainer();
        const userTitleInstance = new UserTitle();
        const TodoInputInstance = new TodoInput();
        const userAddButtonInstance = new UserAddButton();
        TodoListContainerInstance.render();
        userTitleInstance.render();
        TodoInputInstance.render();
        userAddButtonInstance.render();


    }
}