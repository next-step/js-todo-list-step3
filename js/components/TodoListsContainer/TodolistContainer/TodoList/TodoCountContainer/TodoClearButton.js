import Component from '../../../../../core/Component.js';

export default class TodoClearBtn extends Component {
  initEventListener() {
    this.$target.addEventListener('click', ({ target }) => {
      const urlParams = new URLSearchParams(window.location.search);
      const teamId = urlParams.get('id');
      const memberId = target.closest(`[data-member-id]`)?.dataset.memberId;
      this.props.clearTodo(teamId, memberId);
    });
  }

  render() {
    this.$target.innerHTML = '모두 삭제';
  }
}
