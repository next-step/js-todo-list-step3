import { Observer } from "../../observer/Observer.js";
import { toHtml } from "../../utils/utils.js";


export const TodoTitle = class extends Observer {

    setState(subject) {
        super.setState({name: this._service.currentTeam().name, $target: subject.target});
    }

    template() {
        const { name } = this._state;
        return `<h1 class="user-title-container" id="user-title" data-username="hansol">\
                    <span><strong>${name}</strong>'s Todo List</span>\
                    <button type="button" data-ref="removeMember">⌫</button>
                </h1>`;
    }

    render() {
        const { $target } = this._state;
        const titleNodes = $target.querySelectorAll(".user-title-container");
        if (titleNodes) {
            titleNodes.forEach(elm=>elm.remove());
        }
        $target.prepend(toHtml(this.template()));
    }
}

