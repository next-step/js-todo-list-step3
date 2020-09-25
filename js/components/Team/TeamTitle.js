import Component from "../../core/component.js";
import store from '../../store/index.js';
import { addTeam ,deleteTeam} from "../../service/TeamApi.js";

export default class TeamTitle extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.team-list-container')
        });
    }

    teamTemplate = (teamList) => {
        const template = teamList.map((team) => {
            return `<div class="team-card-container">
                <a href="/kanban.html?name=${team._id}"  class="card">
                    <div class="card-title">
                        ${team.name}
                    </div>
                </a>            
              <button class="destroy" data-id="${team._id}">X</button>
            </div>`
        }).join('')
        return template;

    }
    addTeamTemplate = () => {
        return `<div class="add-team-button-container">
            <button id="add-team-button" class="ripple">
                <span class="material-icons">add</span>
            </button>
        </div>`
    }

    render() {
        let self = this;

        const template = this.teamTemplate(store.state.team);
        self.element.innerHTML = template;
        self.element.innerHTML += this.addTeamTemplate();

        self.element.querySelector('#add-team-button').addEventListener('click', async e => {
            const teamName = prompt('팀을 입력해주십시오.');

            const response = await addTeam(teamName);
            store.dispatch('addTeam', response);
            console.log(response, 'response');
            console.log(store.state.team, 'response team');
        })

        self.element.querySelectorAll('.destroy').forEach((button) => {
            button.addEventListener('click', async ({target}) => {
                const isDelete= confirm('정말 지우시겠습니까?');
                if(isDelete){
                    const targetTeamId = target.dataset.id;
                    const response = await deleteTeam(targetTeamId);
                    store.dispatch('deleteTeam' , targetTeamId);
                    console.log(response , 'deleteItem');
                }
            })
        })


    }
}