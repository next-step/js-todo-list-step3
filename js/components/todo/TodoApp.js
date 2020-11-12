import { Subject } from "../../observer/Subject.js";
import { getUrlParams } from "../../utils/utils.js";
import { TeamService } from "../../service/TeamService.js";
import { TodoTitle } from "./TodoTitle.js";
import { TodoList } from "./TodoList.js";
import { Pipe } from "../../observer/Pipe.js";
import { TeamHttpClient } from "../../apiclient/TeamHttpClient.js";
import { TodoInput } from "./TodoInput.js";
import { TodoFooter } from "./TodoFooter.js";


export const TodoApp = class extends Subject {
    #httpClient;
    #service;
    #target;
    #pipe;

    constructor(target) {
        super();
        this.#target = target
        this.#httpClient=new TeamHttpClient();
        this.#service = new TeamService(this.#httpClient, this);
        this.#pipe = new Pipe();
        this.init();

    }

    init = async () => {
        const { teamId } = getUrlParams();
        await this.#service.setup(teamId);
        this.addObservers(
            new TodoTitle(this.#target, this),
            new TodoList(this.#target, this),
            new TodoInput(this.#target, this),
            new TodoFooter(this.#target, this)
        )
        this.notify();
    }

    get httpClient() {
        return this.#httpClient;
    };


    get service() {
        return this.#service;
    };

    get target() {
        return this.#target;
    };

    get pipe() {
        return this.#pipe;
    };

};

const todoapp = new TodoApp(document.getElementById("app"));
