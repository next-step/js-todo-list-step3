import Component from '../core/Component';

export default class Router extends Component {
  render() {
    if (window.location.pathname === '/kanban') {
      new TodoList($container, {
        class: ['todoapp-list-container', 'flex-column-container'],
      });
    } else {
      new TeamList($container, { class: ['team-list-container'] });
    }
  }
}
