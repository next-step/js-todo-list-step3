import Component from '../core/Component.js';
import TeamList from '../components/TeamList/index.js';
import TodoListContainer from '../components/TodoListsContainer/index.js';

export default class Router extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  routeTo = (path, data = {}, title = '') => {
    window.history.pushState(data, title, path);
    this.initEventListener();
    this.render();
  };

  initEventListener = () => {
    window.addEventListener('popstate', (e) => {
      window.history.go(-1);
      this.render();
    });
  };

  render = () => {
    const $router = this.$parent.querySelector('.js-router');
    if ($router) $router.remove();

    if (window.location.pathname === '/kanban.html') {
      new TodoListContainer(this.$parent, {
        class: ['todoapp-list-container', 'flex-column-container', 'js-router'],
        routeTo: this.routeTo,
        setTitle: this.props.setTitle,
      });
    } else {
      new TeamList(this.$parent, {
        class: ['team-list-container', 'js-router'],
        routeTo: this.routeTo,
        setTitle: this.props.setTitle,
      });
    }
  };
}
