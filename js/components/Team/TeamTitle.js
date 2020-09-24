import Component from "../../core/component.js";
import store from '../../store/index.js';
import {getTeamList , addTeam} from "../../service/TeamApi.js";

export default class TeamTitle extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.team-list-container')
        });
    }

    teamTemplate = (teamList) => {
        const template =  teamList.map((team) => {
            return `<div class="team-card-container">
                <a href="/kanban.html/${team._id}"  class="card">
                    <div class="card-title">
                        ${team.name}
                    </div>
                </a>
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

    async render() {
        let self = this;

        if (store.state.team.length === 0) {

            const teamList = await getTeamList();
            store.dispatch('getTeamList', teamList);
            const template = this.teamTemplate(store.state.team);
            self.element.innerHTML = template;
            self.element.innerHTML += this.addTeamTemplate();

            self.element.querySelector('#add-team-button').addEventListener('click', async e=>{
                const teamName = prompt('팀을 입력해주십시오.');

                const response = await addTeam(teamName);
                console.log(response , 'response');
            })
            return;
        }


        self.element.querySelectorAll('button').forEach((button, index) => {
            console.log(index ,  'index');
            button.addEventListener('click', () => {

            })
        })

    }
}