import {
  COMPLETED,
  ALL,
  ACTIVE,
  SELECTED,
  PRIORITY,
} from '../../../../../constants/index.js';
import Component from '../../../../../core/Component.js';

export default class TodoFilter extends Component {
  $filters;

  constructor($target, props) {
    super($target, props);

    this.$filters = this.$target.querySelectorAll('li > a');
  }

  initEventListener() {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;

      this.$filters.forEach(($filter) => {
        if (target === $filter) {
          this.props.filterType.value = $filter.dataset.type;
          $filter.classList.add(SELECTED);
        } else {
          $filter.classList.remove(SELECTED);
        }
      });
    });
  }
  render() {
    this.$target.innerHTML = `
      <li>
        <a href="#all" data-type=${ALL} class="selected">전체보기</a>
      </li>
      <li>
        <a href="#priority" data-type=${PRIORITY}>우선 순위</a>
      </li>
      <li>
        <a href="#active" data-type=${ACTIVE}>해야할 일</a>
      </li>
      <li>
        <a href="#completed" data-type=${COMPLETED}>완료한 일</a>
      </li>
    `;
  }
}
