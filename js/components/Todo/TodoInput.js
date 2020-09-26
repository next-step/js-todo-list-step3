import Component from "../../core/component.js";
import store from '../../store/index.js';
import {keyboardKey} from "../../constants/constants.js";

export default class TodoInput extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.todoapp-list-container.flex-column-container')
        });
    }

    todoInputTemplate = () => `<input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />`;


    render() {
        let self = this;


        self.element.querySelectorAll('.input-container').forEach((node) => {

            node.innerHTML = this.todoInputTemplate();
            node.addEventListener('keyup', async ({key, target}) => {
                if (key === keyboardKey.Enter) {


                    target.value = '';
                }
            })

        });


    }
}