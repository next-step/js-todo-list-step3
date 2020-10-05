import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class UserTitle extends Component {
    userTitleTemplate = ({name}) =>
        `<h2><span><strong>${name}</strong>'s Todo List</span>`;

    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }


    render() {
        this.element.querySelectorAll('.user-name-container').forEach((node) => {
            const nodeId = node.dataset.memberId;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => nodeId === item._id);
            node.innerHTML = this.userTitleTemplate(store.state.selectedTeam.members[memberIdx]);
        });




    }
}