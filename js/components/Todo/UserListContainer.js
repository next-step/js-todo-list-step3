import Component from "../../core/component.js";
import store from '../../store/index.js';
import UserTitle from "./UserTitle.js";
import UserAddButton from "./UserAddButton.js";
import TodoInput from "./TodoInput.js";

export default class UserListContainer extends Component {
    todoUserContainerTemplate = ({_id}) =>
        `<li class="todoapp-container" data-id="${_id}">
                <section class="user-name-container" data-id="${_id}">
                </section>
                  <div class="todoapp">
                    <section class="input-container">
                    </section>
                    <section class="main">
                    </section>
                </div>
</li>`;

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

        const userAddButtonInstance = new UserAddButton();

        userAddButtonInstance.render();
        const userTitleInstance = new UserTitle();
        const TodoInputInstance = new TodoInput();
        userTitleInstance.render();
        TodoInputInstance.render();

    }
}