import Component from '../../core/Component.js';

export default class TodoListCounter extends Component {
  template() {
    console.log(this.$props);
    return `
      <span class="todo-count">총 <strong>${this.$props.count}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#all" class="${
            this.$props.show === 'ALL' ? 'selected' : ''
          }">전체보기</a>
        </li>
        <li>
          <a href="#priority" class="${
            this.$props.show === 'PRIORITY' ? 'selected' : ''
          }">우선 순위</a>
        </li>
        <li>
          <a href="#active" class="${
            this.$props.show === 'ACTIVE' ? 'selected' : ''
          }">해야할 일</a>
        </li>
        <li>
          <a href="#completed" class="${
            this.$props.show === 'COMPLETED' ? 'selected' : ''
          }">완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
    `;
  }
}
