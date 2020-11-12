import { Observer } from "../../observer/Observer.js";
import { Priorities_num, FooterTab } from "../../data/constant.js";
import { TodoListFactory } from "../../factory/todo/TodoListFactory.js";
import { toHtml } from "../../utils/utils.js";

export const TodoList = class extends Observer {
    #pipe;#teamId;
    constructor(target, subject) {
        super(target, subject);
        this.#pipe = subject.pipe;
        this.#teamId = this._service.currentTeam()._id;
    }

    setEvent() {
        //1. todoItem 토글
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("toggle")) {
                this.#toggle(target);
            }
        });
        //2. todoItem 삭제
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("destroy")) {
                this.#destroy(target);
            }
        });

        //3. todoItem 우선순위 변경
        this._target.addEventListener('change', ({ target }) => {
            if (target && target.tagName === "SELECT" ) {
                this.#changePriority(target);
            }
        });

        //4. todoItem 수정하기
        this._target.addEventListener('dblclick', ({ target }) => {
            if (target && target.classList.contains("label")) {
                this.#modifyStart(target);
            }
        });

        //5. todoItem 수정완료및 적용
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("edit") && key === "Enter") {
                this.#modifyComplete(target);
            }
        });

        //6. todoItem 취소
        this._target.addEventListener('keyup', ({ target, key }) => {
            if (target && target.classList.contains("edit") && key === "Escape") {
                this.#undo(target);
            }
        });

        //7. 멤버 추가
        this._target.addEventListener('click', ({ target }) => {
            if (target && (target.id === "add-user-button"||target.classList.contains("material-icons"))) {
                let name = prompt("멤버 추가하기");
                if (name) {
                    name = name.toString().trim();
                    if (name !== "") {
                        this.#addTeamMember(name);
                    }
                }

            }
        });
        //8. 멤버 삭제
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("btn-remove-member")) {
                this.#deleteMember(target);
            }
        });

    }

    getContainer = () => this._target.querySelector("todoapp-list-container");


    #getItem(target) {
        const $li = target.closest(".todo-list-item");
        const memberId = $li.closest(".todoapp-container").dataset["containerIndex"];
        return { $li, itemId: $li.dataset["todoIdx"] , memberId}
    }

    async #addTeamMember(name) {
        const currentTeam = await this._service.addTeamMember(this.#teamId, name);
        super.setState({members: currentTeam.members});
    }

    async #toggle(target) {
        const { $li, itemId, memberId } = this.#getItem(target);
        await this._service.toggleTodoItemByTeamMember(this.#teamId, memberId, itemId);
        this.#filtering({memberId, tab:this.#currentTab(memberId)});

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

    async #changePriority(target) {
        const { itemId, memberId} = this.#getItem(target);
        await this._service.modifyPriorityTodoItemByTeamMember(this.#teamId, memberId, itemId, target.value);
        await this.#filtering({ memberId, tab:this.#currentTab(memberId) });
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
                const todoItem = new TodoListFactory(member).build();
                const { _id } = member;
                frame.prepend(todoItem);
                this.#pipe.regist({
                    topic: "addTodoItem",
                    key: _id,
                    handler: this.#addToItem,
                    context: this
                });
                this.#pipe.regist({
                    topic:"changeFilter",
                    key: _id,
                    handler: this.#filtering,
                    context: this
                });
                this.#pipe.regist({
                    topic:"clearAll",
                    key:_id,
                    handler: this.#clearAll,
                    context:this
                })
            });
        }
        return frame;
    }
    #currentTab = (memberId)=>this._target.querySelector(`[data-container-index="${memberId}"] .filters`).dataset["currentTab"];

    #addToItem = async ({ memberId, contents }) => {
        await this._service.addTodoItemByTeamMember(this.#teamId, memberId, contents);
        await this.#filtering({memberId, tab:this.#currentTab(memberId)});
    }

    async #deleteMember(target) {
        const memberId = target.closest(".todoapp-container").dataset["containerIndex"];
        const { name } = this._service.findMember(memberId);
        const deleteConfirm= confirm(`${name}님을 삭제하시겠습니까?`);
        if (deleteConfirm) {
            const { members } = await this._service.deleteTeamMember(this.#teamId, memberId);
            this.#pipe.unregists({
                topics: ["addTodoItem", "changeFilter", "clearAll"],
                key: memberId
            });
            super.setState({ members });
        }
    }

    async #filtering({ memberId, tab }) {
        const member = this._service.findMember(memberId);
        const { _id, name, todoList } = member;
        let filteredTodoList;
        switch (tab) {
            case FooterTab.ALL: {
                filteredTodoList = todoList;
                break;
            }
            case FooterTab.PRIORITY: {
                filteredTodoList = todoList.sort((prev,after)=> Priorities_num[prev.priority] - Priorities_num[after.priority]);
                break;
            }
            default: {
                filteredTodoList = todoList.filter((item) => {
                    return tab===FooterTab.ACTIVE
                        ? (!item.isCompleted)
                        : (!!item.isCompleted)
                });
                break;
            }
        }
        const $member = document.querySelector(`[data-container-index="${memberId}"]`);
        const $newNode = new TodoListFactory({ _id, name, todoList:filteredTodoList, tab:tab}).build();
        this._target.querySelector(".todoapp-list-container").replaceChild($newNode, $member);
    }

    async #clearAll({ memberId }) {
        await this._service.delteAllTodoItemByTeamMember(this.#teamId, memberId);
        this.#filtering({ memberId, tab:this.#currentTab(memberId)});

    }
}

