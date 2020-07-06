import { MESSAGE, FILTER_NAME } from '../utils/constants.js';

export default class TodoFilter {
  constructor({
    data,
    $targetCountContainer,
    $targetFilter,
    onDeleteAllTodoItems,
    onSelectFilter,
  }) {
    this.data = data;
    this.$targetCountContainer = $targetCountContainer;
    this.$targetFilter = $targetFilter;

    this.$targetCountContainer.addEventListener('click', (e) => {
      const { className, tagName } = e.target;
      if (className === FILTER_NAME.CLEAR_ALL) {
        const deleteAllConfirm = confirm(MESSAGE.CONFIRM);
        deleteAllConfirm && onDeleteAllTodoItems();
        return;
      }
      if (tagName === 'A') {
        const $targetFilterType = this.$targetFilter.querySelectorAll('a');
        $targetFilterType.forEach((node) => node.classList.remove('selected'));
        e.target.classList.add('selected');
        onSelectFilter();
        return;
      }
    });
  }
}
