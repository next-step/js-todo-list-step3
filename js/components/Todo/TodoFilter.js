import {
  ALL,
  COMPLETED,
  ACTIVE,
  SELECTED,
  NOTLI,
  FILTERS,
} from "../../utils/data.js";
import { errorCallTemplate } from "../../utils/template.js";

export default function TodoFilter({ $target, filterType, filterTodo }) {
  this.init = () => {
    if (!(this instanceof TodoFilter)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      filterType: filterType,
    };
    this.$todoFilter = document.createElement("ul");
    this.$todoFilter.classList.add(FILTERS);
    this.filterTodo = filterTodo;
    this.render();
    this.bindEventListener();
    $target.appendChild(this.$todoFilter);
  };
  this.switchFilter = (type) => {
    if (type === ACTIVE) {
      this.filterTodo({
        type: ACTIVE,
      });
    } else if (type === COMPLETED) {
      this.filterTodo({
        type: COMPLETED,
      });
    } else {
      this.filterTodo({
        type: ALL,
      });
    }
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "A" &&
      !evt.target.classList.contains(SELECTED)
    ) {
      this.switchFilter(evt.target.hash.split("/")[1]);
    }
  };
  this.bindEventListener = () => {
    this.$todoFilter.addEventListener("click", this.clickHandler);
  };
  this.render = () => {
    this.$todoFilter.innerHTML = `
      <li>
        <a href="#all" class="selected">전체보기</a>
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
    `;
    // [...this.$todoFilter.childNodes].forEach((el) => {
    //   const currentHash =
    //     el.tagName === "LI" ? el.childNodes[1].hash.split("/")[1] : NOTLI;
    //   if (currentHash !== NOTLI && currentHash !== this.state.filterType) {
    //     el.childNodes[1].classList.remove(SELECTED);
    //   } else if (
    //     currentHash !== NOTLI &&
    //     currentHash === ("" || this.state.filterType) &&
    //     !el.childNodes[1].classList.contains(SELECTED)
    //   ) {
    //     el.childNodes[1].classList.add(SELECTED);
    //   }
    // });
  };
  this.setState = (type) => {
    this.state.filterType = type;
    this.render();
  };
  this.init();
}
