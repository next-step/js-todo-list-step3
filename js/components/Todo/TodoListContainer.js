import Component from "../../core/component.js";
import store from '../../store/index.js';
import UserTitle from "./UserTitle.js";

export default class TodoListContainer extends Component {
    todoListContainerTemplate = ({_id}) =>
        `<li class="todoapp-container" data-id="${_id}"></li>`;


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
        self.element.innerHTML ='';
        store.state.selectedTeam.members.forEach( member => {
            self.element.innerHTML += this.todoListContainerTemplate(member);
        })


        const userTitleInstance = new UserTitle();
        userTitleInstance.render();
    }
}