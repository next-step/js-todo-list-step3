import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class TodoTeamTitle extends Component {
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
        this.element.innerHTML = this.teamTitleTemplate(store.state.selectedTeam.name);
    }
}