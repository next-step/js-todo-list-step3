import { Observer } from "../../observer/Observer.js";
import { Priorities } from "../../data/constant.js";
import { TodoItemFactory } from "../../factory/todo/TodoItemFactory.js";
import { toHtml } from "../../utils/utils.js";

export const TodoList = class extends Observer {
    #pipe;#teamId;
    constructor(target, subject) {
        super(target, subject);
        this.#pipe = subject.pipe;
        this.#teamId =   this._service.currentTeam()._id;
        this.initialize();
    }

    setEvent() {
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("toggle")) {
                this.#toggle(target);
            }
        });
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("destroy")) {
                this.#destroy(target);
            }
        });
        this._target.addEventListener('change', ({ target }) => {
            if (target && target.tagName === "SELECT") {
                this.#changePriority(target);
            }
        });
        this._target.addEventListener('dblclick', ({ target }) => {
            if (target && target.classList.contains("label")) {
                this.#modifyStart(target);
            }
        });
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("edit") && key === "Enter") {
                this.#modifyComplete(target);
            }
        });
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("edit") && key === "Escape") {
                this.#undo(target);
            }
        });

    }

    initialize = () => {
        this.#pipe.regist({
            topic: "addMember",
            key: "todoList",
            handler: this.#renderAddMember,
            context: this
        });
        this.#pipe.regist({
            topic: "deleteMember",
            key: "todoList",
            handler: this.#renderDeleteMember,
            context: this
        });
        this.#pipe.regist({
            topic: "update",
            key: "todoList",
            handler: this.#renderDeleteMember,
            context: this
        });
    }
    getContainer = () => this._target.querySelector("todoapp-list-container");


    #renderAddMember(member) {
        const $ul = this.getContainer();
        if ($ul) {
            $ul.prepend(new TodoItemFactory(member).build());
        }
    }

    #renderDeleteMember(memberId) {
        const $ul = this.getContainer();
        if ($ul) {
            const $memberTodoItem = $ul.querySelector(`[data-container-index='${memberId}']`);
            if ($memberTodoItem) {
                $memberTodoItem.remove();
            }
        }
    }


    #getItem(target) {
        const $li = target.closest(".todo-list-item");
        const memberId = $li.closest(".todoapp-container").dataset["containerIndex"];
        return { $li, itemId: $li.dataset["todoIdx"] , memberId}
    }

    async #toggle(target) {
        const { $li, itemId, memberId } = this.#getItem(target);
        $li.classList.toggle("completed");
        await this._service.toggleTodoItemByTeamMember(this.#teamId, memberId, itemId);

    }

    async #destroy(target) {
        const { $li, itemId, memberId } = this.#getItem(target);
        $li.remove();
        await this._service.deleteTodoItemByTeamMember(this.#teamId, memberId, itemId);
    }

    #modifyStart(target) {
        const { $li } = this.#getItem(target);
        $li.classList.add("editing");
        $li.querySelector(".edit").focus()
    }

    #undo(target) {
        const { $li } = this.#getItem(target);
        target.value = $li.querySelector(".label-content").textContent;
        $li.classList.remove("editing");
    }

    async #modifyComplete(target) {
        const { $li, itemId, memberId } = this.#getItem(target);
        const $label = $li.querySelector(".label-content");
        $li.classList.remove("editing");
        const contents = target.value.toString().trim();
        if (contents !== $label.textContent) {
            $li.querySelector(".label-content").textContent = contents;
            await this._service.modifyTodoItemByTeamMember(this.#teamId, memberId, itemId, contents);
        }
    }

    #changePriority(target) {
        const { itemId } = this.#getItem(target);
        this._service.updateItemPriority(itemId, target.value);
    }


    setState(subject) {
        super.setState({ members: this._service.currentTeam().members });
    }


    render() {
        const $listNodes = this._target.querySelectorAll(".todoapp-list-container");
        if ($listNodes) {
            $listNodes.forEach(node => node.remove());
        }
        this._target.append(this.template());

    }

    template = () => {
        const { members } = this._state;
        const frame = toHtml(`<ul class="todoapp-list-container flex-column-container">
                         <li class="add-user-button-container">
                           <button id="add-user-button" class="ripple">
                             <span class="material-icons">add</span>
                           </button>
                         </li>
                       </ul>`);
        if (members) {
            members.forEach(member => {
                const todoItem = new TodoItemFactory(member).build();
                frame.prepend(todoItem);
                this.#pipe.regist({
                    topic: "addTodoItem",
                    key: member._id,
                    handler: this.#addToItem,
                    context: this
                });
            });
        }
        return frame;
    }


    #addToItem = async ({ memberId, contents }) => {
        const currentMember = await this._service.addTodoItemByTeamMember(this.#teamId, memberId, contents);
        const $member = document.querySelector(`[data-container-index="${memberId}"]`);
        const $newNode = new TodoItemFactory(currentMember).build();
        this._target.querySelector(".todoapp-list-container").replaceChild($newNode, $member);
    }
}

