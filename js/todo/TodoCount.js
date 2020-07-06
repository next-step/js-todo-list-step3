import { todoCountTemplate } from '../utils/templates.js';
import * as functions from '../utils/functions.js';

export default class TodoCount {
  constructor({ data, filteredData, $targetTodoCount }) {
    this.data = data;
    this.filteredData = filteredData;
    this.$targetTodoCount = $targetTodoCount;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data) return;
    const hash = location.hash.substring(1);
    this.filteredData = functions.filteringTodoList(this.data, hash);
    this.$targetTodoCount.innerHTML = todoCountTemplate(
      this.filteredData.length,
    );
  }
}
