import Observer from "../../core/Observer.js";
import { $, $$ } from "../../util/util.js"
import { teamAPI } from "../../api/api.js";

export class TeamList extends Observer{
    constructor(teamState){
        super();
        this.teamState = teamState;
       console.log(teamState)
    }
    template(){
        const teamlist = this.teamState.get();
        
        return `
        ${teamlist.map(item => `
            <div class="team-card-container">
            <a href="/kanban.html?id=${item._id}" class="card">
                <div class="card-title">
                ${item.name}
                </div>
            </a>
            </div>
        `).join('')}
            <div class="add-team-button-container">
            <button id="add-team-button" class="ripple">
            <span class="material-icons">add</span>
            </button>
        </div>
        `
    }
    render(){
        const target = $(".team-list-container");
        target.innerHTML = this.template();
        this.mounted();
    }
    mounted(){
        const createTeamBtn = $('#add-team-button');
        createTeamBtn.addEventListener('click',this.onCreateteam.bind(this));
    }
    update(){
        this.render();
    }
    async onCreateteam(e){
        const teamName = prompt("추가하는 팀 이름을 입력해주세요");
        if(teamName.length <2){
            alert("이름의 길이는 최소2글자이상입니다.");
            return;
        }

        const data = await teamAPI.postTeam({name : teamName});
        const teamList = await teamAPI.getTeam();
        this.teamState.set(teamList);

    }
} 