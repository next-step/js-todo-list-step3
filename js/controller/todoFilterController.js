'use strcit';

import { todoAppView } from '../view/todoAppView.js';
import { elementValidator } from '../utils/validator.js';

export default class TodoFilterController {
  constructor() {
    todoAppView.$todoappListContainer.addEventListener(
      'click',
      this.onClickFilter
    );
  }

  onClickFilter = ({ target }) => {
    if (
      elementValidator.isNotFilterBtn(target) &&
      elementValidator.isNotClearBtn(target)
    )
      return;
    if (elementValidator.isFilterBtn(target)) {
      this.changeFilter(target);
      return;
    }
    if (elementValidator.isClearBtn(target)) {
      this.clearAllItems(target);
      return;
    }
  };

  changeFilter(target) {
    console.log('TodoFilterController - changeFilter');
  }

  clearAllItems(target) {
    console.log('TodoFilterController - clearAllItems');
  }
}
