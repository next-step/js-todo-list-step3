import Component from '../core/Component.js';
import Router from '../router/index.js';
import Title from '../components/Title.js';
import State from '../core/State.js';

export default class App extends Component {
  $target;
  title;

  constructor($target) {
    super();
    this.$target = $target;
    this.title = new State('Team');

    this.render();
  }

  setTitle = (newTitle) => {
    this.title.value = newTitle;
  };

  render = () => {
    new Title(this.$target, { id: 'user-title', title: this.title }, 'h1');
    new Router(this.$target, { setTitle: this.setTitle });
  };
}
