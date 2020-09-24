import Component from "../../core/component.js";
import store from '../../store/index.js';

export default class TeamContainer extends Component{
    constructor() {
        super({
            store,
            element : document.querySelector('.todoapp-list-container flex-column-container')
        });
    }

    render(){
        let self = this;
        self.element.innerHTML ;
    }
}