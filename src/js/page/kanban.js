import Title from '../components/common/Title.js';
import TodoAppListContainer from "../components/kanban/TodoAppListContainer.js";
import Component from '../core/Component.js';
import { store } from "../store/index.js";
import { getQueryString } from '../util/queryString.js';
import { $ } from '../util/selector.js';

class App extends Component {
  async asyncData() {
    const { id } = getQueryString();
    store.commit('fetchTeamId', id);
    await store.dispatch('FETCH_TEAM_TODOLIST');
  }

  mounted() {
    new Title($('#user-title'));
    new TodoAppListContainer($('.todoapp-list-container'));
  }

  template() {
    return `
      <h1 id="user-title"></h1>
      <ul class="todoapp-list-container flex-column-container"></ul>
    `;
  }
}

new App($('#app'));
