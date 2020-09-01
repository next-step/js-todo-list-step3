import { FilterType } from "../../Common/constants.js";
import { validateFunction, validateInstance } from "../../Common/utils.js";

function TodoFilter($target, type, { onChangeType }) {
  validateInstance(TodoFilter, this);
  validateFunction(onChangeType);

  this.type = type;

  this.setState = (newType) => {
    this.type = newType;
    this.render();
  };

  this.initEventListeners = () => {
    const onClickHandler = (event) => {
      if (event.target.classList.contains(FilterType.ALL)) {
        onChangeType(FilterType.ALL);
      } else if (event.target.classList.contains(FilterType.ACTIVE)) {
        onChangeType(FilterType.ACTIVE);
      } else if (event.target.classList.contains(FilterType.COMPLETED)) {
        onChangeType(FilterType.COMPLETED);
      }
    };

    $target.addEventListener("click", onClickHandler);
  };

  this.render = () => {
    $target.innerHTML = `
        <ul class="filters">

            <li>
                <a class="${FilterType.ALL} 
                ${this.type === FilterType.ALL ? "selected" : ""}">전체보기</a>
            </li>
            <li>
                <a class="${FilterType.ACTIVE} 
                ${
                  this.type === FilterType.ACTIVE ? "selected" : ""
                }">해야할 일</a>
            </li>
            <li>
                <a class="${FilterType.COMPLETED} 
                ${
                  this.type === FilterType.COMPLETED ? "selected" : ""
                }">완료한 일</a>
            </li>

        </ul>
    `;
  };

  this.render();
  this.initEventListeners();
}

export default TodoFilter;
