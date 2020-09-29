import Component from '../../../../core/Component.js';

export default class TodoInput extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  initEventListener() {
    this.$target.addEventListener('keyup', ({ key, target }) => {
      if (key === 'Enter') {
        if (!target.value) return;
        const urlParams = new URLSearchParams(window.location.search);
        const teamId = urlParams.get('id');
        const memberId = target.closest(`[data-member-id]`)?.dataset.memberId;

        this.props.addTodo(teamId, memberId, target.value);
        this.$target.value = '';
      }
    });
  }

  render = () => {
    this.$target.innerHTML = `
      <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
    `;
  };
}
