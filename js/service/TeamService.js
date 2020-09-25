export const TeamService = class {
    #httpClient;
    #teams = [];
    #currentTeam;
    #subject;

    constructor(httpClient, subject) {
        if (httpClient) {
            this.#httpClient = httpClient;
        }
        this.#subject = subject;
    }

    setup = async (teamId=null) => {
        if(teamId)
            this.#currentTeam = await this.#httpClient.loadTeam(teamId);
        this.#teams = await this.#httpClient.loadTeams();
    }

    currentTeam(){
        return this.#currentTeam;
    }

    getTeams() {
        if(this.#teams.length <= 0)
            return this.#httpClient.loadTeams();
        return this.#teams;
    }

    addTeam = async (name) => {
        const response = await this.#httpClient.addTeam(name);
        this.#teams.push(response);
        return true;
    }

    getTodoByTeamMember = (teamId, memberId) => {
        return this.#httpClient.loadTodoListByTeamMember(teamId, memberId);
    };

    addTodoItemByTeamMember = async (teamId, memberId, contents) => {
        await this.#httpClient.addTodoItemByTeamMember(teamId, memberId, contents);
        await this.setup(teamId);
        return this.#currentTeam.members.find(({ _id }) => _id === memberId);
    };

    toggleTodoItemByTeamMember = async (teamId, memberId, itemId) => {
        await this.#httpClient.toggleTodoItemByTeamMember(teamId, memberId, itemId);
        await this.setup(teamId);
        return true;
    };

    deleteTodoItemByTeamMember = async (teamId, memberId, itemId) => {
        await this.#httpClient.deleteTodoItemByTeamMember(teamId, memberId, itemId);
        await this.setup(teamId);
    };

    modifyTodoItemByTeamMember = async (teamId, memberId, itemId, contents) => {
        await this.#httpClient.modifyTodoItemByTeamMember(teamId, memberId, itemId, contents);
        await this.setup(teamId);
        return true;
    };

};
