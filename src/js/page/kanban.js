import Title from '../components/common/Title.js';
import TodoAppListContainer from "../components/kanban/TodoAppListContainer.js";

import Component from '../core/Component.js';
import { teamAPI } from "../api/team.js";
import { getQueryString } from '../util/queryString.js';
import { $ } from '../util/selector.js';

class App extends Component {
  async setup() {
    const { id } = getQueryString();
    const { name, members } = await teamAPI.fetchTeam(id);
    this.$state = { name, members };
    this.render();
  }

  mounted() {
    new Title($('#user-title'), { title: this.$state.name });
    new TodoAppListContainer($('.todoapp-list-container'), this.$state.members);
  }

  template() {
    return `
      <h1 id="user-title"></h1>
      <ul class="todoapp-list-container flex-column-container"></ul>
    `;
  }
}

new App($('#app'));
