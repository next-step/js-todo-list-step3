import {Component} from "../../core/Component.js";
import {teamStore} from "../../store/teamStore.js";

export const TeamAppendForm = class extends Component {

  render () {
    const { openedAppendForm } = teamStore.$state;
    return openedAppendForm ? `
      <div>
        test      
      </div>
    ` : '';
  }

}