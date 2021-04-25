import { Action } from "../../action/Action.js";
import { $, $$ } from "../../util/domSelection.js";

export class TodoStatusContainer {
  static FILTER_STATE = {
    ALL:'all',
    ACTIVE:'active',
    COMPLETED:'completed',
    PRIORITY:'priority',
  };

  //유저별로 항목이 있음.
  constructor() {
    
  }

  getItemCount($todoAppContainer){
    let count = 0;
    $$(".todo-list li",$todoAppContainer).forEach((li) => {
      if (li.style.display != "none") count = count + 1;
    });
    return count;
  }
  render(filterState,$todoAppContainer) {
    const [countContainer] = $$('div.count-container',$todoAppContainer);
    // const [todoCount] = $$(".todo-count strong",countContainer)
    // todoCount.textContent = this.getItemCount($todoAppContainer);
    const count = this.getItemCount($todoAppContainer);
    const countContainerInnerHTML =
    `<span class="todo-count">총 <strong>${count}</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="#all" ${filterState == TodoStatusContainer.FILTER_STATE.ALL ? 'class="selected"': ''}>전체보기</a>
          </li>
          <li>
            <a href="#priority" ${filterState == TodoStatusContainer.FILTER_STATE.PRIORITY ? 'class="selected"': ''}>우선 순위</a>
          </li>
          <li>
            <a href="#active" ${filterState == TodoStatusContainer.FILTER_STATE.ACTIVE ? 'class="selected"': ''}>해야할 일</a>
          </li>
          <li>
            <a href="#completed" ${filterState == TodoStatusContainer.FILTER_STATE.COMPLETED ? 'class="selected"': ''}>완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>`
      countContainer.innerHTML=countContainerInnerHTML;
    
  }
}
