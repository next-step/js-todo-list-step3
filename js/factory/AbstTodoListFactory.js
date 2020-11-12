import { toHtml } from "../utils/utils.js";

export const AbstTodoListFactory = class {
    frame;state;

    constructor(state) {
        this.state = state;
    }

    _title() {

    }

    _input() {

    }

    _body() {

    }

    _footer() {

    }

    _frame() {

    }

    build() {
        this.frame = toHtml(this._frame());
        this._title();
        this._input();
        this._body();
        this._footer();
        return this.frame;
    }

};
