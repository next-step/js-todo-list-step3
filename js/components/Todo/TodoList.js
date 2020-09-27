import Component from "../../core/component.js";
import store from '../../store/index.js';
import {getTeamToMemberToTodoList} from "../../service/TodoApi.js";

export default class TodoList extends Component {
    todoListTemplate = (member) => {
        if (member.todoList.length > 0) {
            return `<div class="view">
                                <input class="toggle" type="checkbox" />
                                <label class="label">
                                    <div class="chip-container">
                                        <select class="chip select">
                                            <option value="NONE" selected>순위</option>
                                            <option value="FIRST">1순위</option>
                                            <option value="SECOND">2순위</option>
                                        </select>
                                    </div>
                                    해야할 아이템
                                </label>
                                <button class="destroy"></button>
                            </div>
                            <input class="edit" value="완료된 타이틀" />`;
        }
    }

    constructor() {
        super({
            store,
            element: document.querySelector('.main')
        });



    }



    render() {
        let self = this;


        let newMembers  = [];
        const membersCount =self.element.querySelectorAll.length;
        store.state.selectedTeam.members.forEach( async member => {

            const response = await getTeamToMemberToTodoList(store.state.selectedTeam._id, member._id);
            newMembers.push(response);
        });

        store.dispatch('getMemberTodoList', newMembers);





        self.element.querySelectorAll('.todo-list-item').forEach((node) => {
            const nodeId = node.dataset.memberId;
            const memberIdx = store.state.selectedTeam.members.findIndex((item) => nodeId === item._id);
       //     node.innerHTML = this.todoListTemplate(store.state.selectedTeam.members[memberIdx]);
        });


//

    }
}