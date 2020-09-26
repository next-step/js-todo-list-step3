import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class TodoList extends Component {
    userTitleTemplate = ({name}) =>
        `<h2><span><strong>${name}</strong>'s Todo List</span>`;

    constructor() {
        super({
            store,
            element: document.querySelector('.todo-list-item')
        });
    }


    render() {
        let self = this;


    }
}