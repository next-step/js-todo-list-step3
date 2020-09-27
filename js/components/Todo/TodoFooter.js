import Component from "../../core/component.js";
import store from '../../store/index.js';
import {filter,eventType} from "../../constants/constants.js";
import { deleteTeamToMemberToTodoList} from "../../service/TodoApi.js";

export default class TodoFooter extends Component {
    todoListCountTemplate = (filter, todoList , memberId) => {
        return `<span class="todo-count">총 <strong>${todoList.length}</strong> 개</span>
                    <ul class="filters">
                        <li>
                            <a href="#all" ${filter === filter.ALL ? "class='selected'" :''} >전체보기</a>
                        </li>
                        <li>
                            <a href="#priority" ${filter === filter.PRIORITY ? "class='selected'" :''} >우선 순위</a>
                        </li>
                        <li>
                            <a href="#active" ${filter === filter.ACTIVE ? "class='selected'" :''} >해야할 일</a>
                        </li>
                        <li>
                            <a href="#completed" ${filter === filter.COMPLETED ? "class='selected'" :''} >완료한 일</a>
                        </li>
                    </ul>
                    <button class="clear-completed" data-member-id="${memberId}" >모두 삭제</button>
                  `

    }

    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });

    }

    render() {
        let self = this;

        self.element.querySelectorAll('.count-container').forEach((node) => {
            const memberId = node.dataset.memberId;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => memberId === item._id);
            const todoList = store.state.selectedTeam.members[memberIdx].todoList;
            const template = this.todoListCountTemplate( 'ALL' , todoList , memberId);
            node.innerHTML = template;

        })

        this.element.querySelectorAll('.clear-completed').forEach(async (node) => {

            node.addEventListener(eventType.CLICK, async ({key, target}) => {
                const memberId = node.dataset.memberId;
                const deletedTodoItem = {
                    memberId
                }
                const response = await deleteTeamToMemberToTodoList(store.state.selectedTeam._id, memberId);
                store.dispatch('deleteMemberAllTodoList', deletedTodoItem);

            })
        })
    }
}


