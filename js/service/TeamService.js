export const TeamService = class {
    #httpClient;
    #teams = [];
    #subject;

    constructor(httpClient, subject) {
        if (httpClient) {
            this.#httpClient = httpClient;
        }
        this.#subject = subject;
    }

    setup = async () => {
        this.#teams = await this.#httpClient.loadTeams();
    }

    getTeams() {
        return this.#teams;
    }

    addTeam = async (name) => {
        const response = await this.#httpClient.addTeam(name);
        this.#teams.push(response);
        return true;
    }



};
