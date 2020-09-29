import Component from '../../../../../core/Component.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import TodoClearButton from './TodoClearButton.js';

export default class TodoCountConatiner extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = '';
    new TodoCount(
      this.$target,
      { class: ['todo-count'], todos: this.props.todos },
      'span'
    );
    new TodoFilter(
      this.$target,
      { class: ['filters'], filterType: this.props.filterType },
      'ul'
    );
    new TodoClearButton(
      this.$target,
      { class: ['clear-completed'], clearTodo: this.props.clearTodo },
      'button'
    );
  };
}
