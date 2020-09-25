import { Observer } from "../../observer/Observer.js";

export const TodoInput = class extends Observer {
    #pipe;

    constructor(target, subject) {
        super(target, subject);
        this.#pipe = subject.pipe;
    }
    setEvent() {
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("new-todo") && key === 'Enter' && target.value !== "") {
                const memberId = target.closest(".todoapp-container").dataset["containerIndex"];
                const contents = target.value.toString();
                this.#pipe.notify({
                    topic: "addTodoItem",
                    to:memberId,
                    data: { memberId, contents }
                });
                target.value = "";
            }
        });
    }
    render() {

    }
}

