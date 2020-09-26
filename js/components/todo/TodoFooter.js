import { Observer } from "../../observer/Observer.js";

export const TodoFooter = class extends Observer {
    #pipe;#teamId;
    constructor(target, subject) {
        super(target, subject);
        this.#pipe = subject.pipe;
        this.#teamId =   this._service.currentTeam()._id;
    }

    setEvent() {
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.tagName === "A") {
                this.#switchTap(target);
            }
        });

        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("clear-completed")) {
                this.#clearAll(target);
            }
        });
    }

    #switchTap(target) {
        const $filter = target.closest(".filters");
        const selectedTab = target.dataset['tab'];
        const memberId = target.closest(".todoapp-container").dataset["containerIndex"];
        if ($filter.dataset["currentTab"] !== selectedTab) {
            $filter.querySelector(".selected").classList.remove("selected");
            target.classList.add("selected");
            this.#pipe.notify({
                topic: "changeFilter",
                to: memberId,
                data: {memberId, tab:selectedTab},
            });
        }

    }

    #clearAll(target) {
        const memberId = target.closest(".todoapp-container").dataset["containerIndex"];
        const { name } = this._service.findMember(memberId);
        const deleteConfirm = confirm(`${name}님의 아이템을 모두 삭제하시겠습니까?`);
        if (deleteConfirm) {
            this.#pipe.notify({
                topic: "clearAll",
                to:memberId,
                data:{ memberId }
            });
        }
    }

    render(){}
}
