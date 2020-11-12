export const Observer = class {
    _state = {}; _service;_target;
    constructor(target, subject) {
        this._target = target;
        this._service = subject.service;
        this.setEvent();
    }
    get state(){
        return this._state;
    }

    setEvent() {

    }

    setState(state) {
        this._state = {...this._state, ...state};
        this.render();
    }

    render(){
        throw new Error("not exists render logic yet");
    }

    template() {
        return undefined;
    }
};
