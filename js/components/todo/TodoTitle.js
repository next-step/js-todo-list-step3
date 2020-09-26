import { Observer } from "../../observer/Observer.js";
import { toHtml } from "../../utils/utils.js";


export const TodoTitle = class extends Observer {

    #teamId;
    constructor(target, subject) {
        super(target, subject);
        this.#teamId = this._service.currentTeam()._id;
    }

    setEvent() {
        //9. 팀 삭제
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("btn-remove-team")) {
                this.#removeTeam(target);
            }
        });
    }


    setState(subject) {
        super.setState({ name: this._service.currentTeam().name, $target: subject.target });
    }

    template() {
        const { name } = this._state;
        return `<h1 class="user-title-container" id="user-title" data-team-name="${name}">\
                    <span><strong>${name}</strong>'s Todo List</span>\
                    <button type="button" class="btn-remove-team">⌫</button>
                </h1>`;
    }

    render() {
        const { $target } = this._state;
        const titleNodes = $target.querySelectorAll(".user-title-container");
        if (titleNodes) {
            titleNodes.forEach(elm => elm.remove());
        }
        $target.prepend(toHtml(this.template()));
    }

    async #removeTeam(target) {
        const teamName = target.closest(".user-title-container").dataset["teamName"];
        if (confirm(`${teamName}을 삭제하시겠습니까?`)) {
           await this._service.deleteTeam(this.#teamId);
           location.replace("/");
        }
    }
}

