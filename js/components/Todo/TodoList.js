import Component from "../../core/component.js";
import store from '../../store/index.js';
import {addTeamToMember} from "../../service/TodoApi.js";

export default class UserAddButton extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }

    addUserTemplate = () => {
        return `<li class="add-user-button-container">
            <button id="add-user-button" class="ripple">
                <span class="material-icons">add</span>
            </button>
        </li>`
    }

    render() {
        let self = this;

        console.log(self.element.innerHTML , "init");
        self.element.innerHTML += this.addUserTemplate();

        self.element.querySelector('#add-user-button').addEventListener('click', async e => {
            const userName = prompt('유저 이름을 입력해주십시오.');

            if(userName){
                const response = await addTeamToMember(store.state.selectedTeam._id ,userName);
                console.log(response , 'res');
                self.element.innerHTML = '';
                console.log(self.element.innerHTML , 'isInner');
                store.dispatch('addUser', response);
            }
        })


    }
}