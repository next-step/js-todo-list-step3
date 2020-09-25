import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class TodoInput extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.input-container')
        });
    }

    todoInputTemplate = () => {
        return `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;

    }
    render() {
        let self = this;

        self.element.innerHTML = this.todoInputTemplate();

        self.element.querySelector('.new-todo').addEventListener('keyup', async ({target,key})=> {
            if(key === 'Enter'){
                console.log('entered');
            }
        })




    }
}