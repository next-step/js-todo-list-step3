import Component from "../../core/component.js";
import store from '../../store/index.js';
import {getTeamToMemberToTodoList} from "../../service/TodoApi.js";
import {filter} from "../../constants/constants.js";

export default class TodoFooter extends Component {
    todoListTemplate = (filter, todoList) => {
        `<div class="count-container">
                    <span class="todo-count">총 <strong>${todoList.length()}</strong> 개</span>
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
                    <button class="clear-completed">모두 삭제</button>
                    </div>`

    }

    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });

    }

    render() {
        let self = this;

        this.element.querySelectorAll('.todoapp-container').forEach((node) => {
            const nodeId = node.dataset.memberId;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => nodeId === item._id);
            const $ul = node.querySelector('.todo-list');
            const template = this.todoListTemplate(store.state.selectedTeam.members[memberIdx]);
            $ul.innerHTML = template;

        })


    }
}


