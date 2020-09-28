import Component from '../core/Component.js';
import TeamList from '../components/TeamList/index.js';
import TodoList from '../components/TodoList/index.js';

export default class Router extends Component {
  constructor($parent) {
    super($parent);
    this.render();
  }

  routeTo = (path, data = {}, title = '') => {
    window.history.pushState(data, title, path);
    this.render();
  };

  render = () => {
    this.$target.innerHTML = '';
    if (window.location.pathname === '/kanban') {
      new TodoList(this.$target, {
        class: ['todoapp-list-container', 'flex-column-container'],
        routeTo: this.routeTo,
      });
    } else {
      new TeamList(this.$target, {
        class: ['team-list-container'],
        routeTo: this.routeTo,
      });
    }
  };
}
