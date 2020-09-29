import Component from '../../../../core/Component.js';

export default class TodoMain extends Component {
  constructor($parent, props) {
    super($parent, props);
    props.todos.subscribe(this.render);

    this.render();
  }

  initEventListener() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');

    this.$target.addEventListener('click', ({ target }) => {
      const $li = target.closest('li');
      const memberId = target.closest(`[data-member-id]`)?.dataset.memberId;

      if (target.classList.contains('toggle')) {
        $li.classList.toggle('completed');
        setTimeout(
          () => this.props.toggleTodo(teamId, memberId, $li.dataset.key),
          200
        );
      } else if (target.classList.contains('destroy'))
        this.props.deleteTodo(teamId, memberId, $li.dataset.key);
    });

    this.$target.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains('label'))
        target.closest('li').classList.add('editing');
    });

    this.$target.addEventListener('keyup', ({ target, key }) => {
      const $li = target.closest('li');
      const memberId = target.closest(`[data-member-id]`)?.dataset.memberId;

      if (key === 'Enter' && $li.classList.contains('editing'))
        this.props.editTodo(teamId, memberId, $li.dataset.key, target.value);
    });

    this.$target.addEventListener('change', ({ target }) => {
      const $li = target.closest('li');
      const memberId = target.closest(`[data-member-id]`)?.dataset.memberId;

      if (target.classList.contains('chip')) {
        this.props.changeTodoPriority(
          teamId,
          memberId,
          $li.dataset.key,
          target.value
        );
      }
    });
  }

  createPrioritySelect = (priority) => {
    switch (priority) {
      case 'FIRST':
      case '1':
        return `
          <select class="chip select primary">
            <option value="1" selected >1순위</option>
            <option value="2">2순위</option>
            <option value="0">미지정</option>
          </select>
          `;

      case 'SECOND':
      case '2':
        return `
          <select class="chip select secondary">
            <option value="2" selected>2순위</option>
            <option value="1">1순위</option>
            <option value="0">미지정</option>
          </select>
        `;

      default:
        return `
          <select class="chip select ">
            <option value="0" selected >순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        `;
    }
  };

  render = () => {
    this.$target.innerHTML = `<ul class="todo-list"></ul>`;
    const $ul = this.$target.querySelector('.todo-list');

    this.props.todos.value.forEach(
      ({ _id, contents, isCompleted, priority }) => {
        $ul.innerHTML += `
          <li class="todo-list-item ${
            isCompleted ? 'completed' : ''
          }" data-key="${_id}" >
            <div class="view">
              <input class="toggle" type="checkbox" ${
                isCompleted ? 'checked' : ''
              } />
              <label class="label">
                <div class="chip-container">
                  ${this.createPrioritySelect(priority)}
                </div>
                ${contents}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="${contents}" />
          </li>
      `;
      }
    );
  };
}
