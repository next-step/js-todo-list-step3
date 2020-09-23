import { Subject } from "../../observer/Subject.js";
import { TeamHttpClient } from "../../repository/TeamHttpClient.js";
import { TeamService } from "../../service/TeamService.js";
import { TeamList } from "./TeamList.js";
import { Pipe } from "../../observer/Pipe.js";

export const TeamApp = class extends Subject {
    #teamService; #httpClient; #pipe

    constructor(targets) {
        super();
        this.#httpClient = new TeamHttpClient();
        this.#teamService = new TeamService(this.#httpClient);
        this.#pipe = new Pipe();
        this.init(targets);
    }

    init = async (_) => {
        await this.#teamService.setup();
        this.addObservers(
            new TeamList(_.$teamList, this),
        );
        this.notify();
    };

    getPipe = () => this.#pipe;

    get service(){
        return this.#teamService;
    }

};

new TeamApp({
    $teamList: document.querySelector(".team-list-container"),
});
