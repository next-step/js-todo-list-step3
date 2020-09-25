import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class TodoTeamTitle extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('#user-title')
        });
    }


    teamTitleTemplate = (teamName) => {
        return `<span><strong>${teamName}</strong>'s Todo List</span>`;
    }

    render() {
        let self = this;
        self.element.innerHTML = this.teamTitleTemplate(store.state.selectedTeam.name);
    }
}