import Component from "../../core/component.js";
import store from '../../store/index.js';
import {filter,eventType} from "../../constants/constants.js";
import { deleteTeamToMemberToTodoList} from "../../service/TodoApi.js";

export default class TodoFooter extends Component {
    todoListCountTemplate = (selectedFilter, todoList , memberId) => {


        return `<span class="todo-count">총 <strong>${todoList ? todoList.length : '0'}</strong> 개</span>
                    <ul class="filters">
                        <li>
                            <a href="#all"  data-filter=${filter.ALL} data-member-id="${memberId}" class="${selectedFilter === filter.ALL ? 'anchor selected' :'anchor'}" >전체보기</a>
                        </li>
                        <li>
                            <a href="#priority" data-filter=${filter.PRIORITY} data-member-id="${memberId}" class="${selectedFilter === filter.PRIORITY ? 'anchor selected' :'anchor'}" >우선 순위</a>
                        </li>
                        <li>
                            <a href="#active" data-filter=${filter.ACTIVE} data-member-id="${memberId}" class="${selectedFilter === filter.ACTIVE ? 'anchor selected' :'anchor'}" >해야할 일</a>
                        </li>
                        <li>
                            <a href="#completed" data-filter=${filter.COMPLETED} data-member-id="${memberId}" class="${selectedFilter === filter.COMPLETED ? 'anchor selected' :'anchor'}" >완료한 일</a>
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
            const template = this.todoListCountTemplate( "all" , todoList , memberId);
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
        this.element.querySelectorAll('.anchor').forEach(async (node) => {

            node.addEventListener(eventType.CLICK, async (e) => {
                e.preventDefault();
                const memberId = node.dataset.memberId;
                const filterType = node.dataset.filter;

                console.log(memberId);
                console.log(filterType);


                switch (filterType) {
                    case filter.PRIORITY:
                        store.dispatch('sortMemberTodoItemPriority', memberId);
                        break;
                    case filter.ALL :
                        break;
                }

            })
        })
    }
}


