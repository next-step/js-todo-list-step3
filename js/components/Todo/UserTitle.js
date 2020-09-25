

import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class UserTitle extends Component {
    userTitleTemplate = ({name}) =>
        `<h2><span><strong>${name}</strong>'s Todo List</span>
            </h2>`;
    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }


    render() {
        let self = this;

        console.log(store.state.selectedTeam.members);

        self.element.querySelectorAll('.todoapp-container').forEach((node) =>{
            const nodeId = node.dataset.id;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => nodeId === item._id);
            node.innerHTML = this.userTitleTemplate(store.state.selectedTeam.members[memberIdx]);
        });

    }
}