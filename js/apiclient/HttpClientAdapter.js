import { HttpClient } from "./HttpClient.js";
import { BASE_URL, NOOP } from "../data/constant.js";

export const HttpClientAdapter = class extends HttpClient {
    #before = NOOP;
    #after = NOOP;

    constructor() {
        super(BASE_URL);
    }

    #changeBefore(before) {
        if (before)
            this.#before = before;
    }

    #changeAfter(after) {
        if (after)
            this.#after = after;
    }

    async excute(path) {
        try {
            this.#before();
            const response = await super.excute(path);
            this.#after();
            return response;
        } catch (error) {
            console.error(error);
        }
    }

};
