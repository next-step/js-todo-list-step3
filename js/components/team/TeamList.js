import { Observer } from "../../observer/Observer.js";

export const TeamList = class extends Observer {
    #pipe

    constructor(target, subject) {
        super(target, subject);
        this.#pipe = subject.getPipe();
        this.#init();
    }

    #init() {

    }

    setEvent(){
        //1. 팀 추가 이벤트
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.id === "add-team-button") {
                this.#addTeam();
            }
        });
        //2. 팀 클릭 이벤트
        this._target.addEventListener('click', ({ target }) => {
            if (target && target.classList.contains("card")) {
                const teamId = target.closest(".team-card-container").dataset['code'];
                this.#loadTeam(teamId);
            }
        });


    };

    render() {
        this._target.innerHTML = this.template();
    }

    template() {
        return this._service
            .getTeams()
            .map(({ _id, name, members }) => {
                return `<div class="team-card-container" data-code="${_id}">
                          <a href="#none" class="card">
                            <div class="card-title">
                              ${name}
                            </div>
                          </a>
                        </div>`;
            })
            .join('')
            .concat(`<div class="add-team-button-container">
                       <button id="add-team-button" class="ripple">
                         <span class="material-icons">add</span>
                       </button>
                     </div>`);

    }

    #addTeam() {
        const teamName = prompt('팀 이름을 입력해주세요');
        if (teamName && teamName !== "") {
            this._service.addTeam(teamName).then(ok=>{
                return ok?this.render():null;
            })
        }
    }

    #loadTeam(teamId) {
        location.href = `/kanban.html?teamId=${teamId}`;
    }


};
