import Component from '../../../../../core/Component.js';

export default class TodoInput extends Component {
  constructor($parent, props) {
    super($parent, props);
    this.render();
  }

  render = () => {
    this.$target.innerHTML = `
    <span class="todo-count">
      총 <strong>0</strong> 개
    </span>
    <ul class="filters">
      <li>
        <a href="#all" class="selected">
          전체보기
        </a>
      </li>
      <li>
        <a href="#priority">우선 순위</a>
      </li>
      <li>
        <a href="#active">해야할 일</a>
      </li>
      <li>
        <a href="#completed">완료한 일</a>
      </li>
    </ul>
    <button class="clear-completed">모두 삭제</button>
    `;
  };
}
