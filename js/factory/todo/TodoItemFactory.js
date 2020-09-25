import { AbstTodoItemFactory } from "../AbstTodoItemFactory.js";
import { Priorities } from "../../data/constant.js";
import { toHtml } from "../../utils/utils.js";

export const TodoItemFactory = class extends AbstTodoItemFactory {

    constructor(state) {
        super(state);
    }

    _title() {
        const { name } = this.state;
        this.frame.append(toHtml(`<h2><span><strong>${name}</strong>'s Todo List</span>\
                                        <button type="button" data-ref="removeMember">⌫</button></h2>`));
    }

    _input() {
        this.frame.append(toHtml(`<div class="todoapp">\
                                    <section class="input-container">\
                                    <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />\
                                    </section>\
                                 </div>`));
    }

    _body() {
        const { todoList } = this.state;
        this.frame.querySelector(".todoapp")
            .append(toHtml(`<section class="main">
                       <ul class="todo-list">${this.items(todoList)}</ul>
                     </section>`));
    }

    _footer() {
        const { todoList } = this.state;
        this.frame.querySelector(".todoapp")
            .append(toHtml(`<div class="count-container">
              <span class="todo-count">총 <strong>${todoList.length}</strong> 개</span>
              <ul class="filters">
                <li> <a href="#all" class="selected">전체보기</a> </li>
                <li> <a href="#priority">우선 순위</a> </li>
                <li> <a href="#active">해야할 일</a> </li>
                <li> <a href="#completed">완료한 일</a> </li>
              </ul>
              <button class="clear-completed">모두 삭제</button>
            </div>`))
    }

    _frame() {
        const { _id } = this.state;
        return `<li class="todoapp-container" data-container-index="${_id}"></li>`;
    }

    items(values) {
        return values.map(this.item).join('');
    }

    item({ _id, contents, isCompleted, priority }) {
        return `<li class="todo-list-item ${isCompleted ? "completed" : ""}" data-todo-idx="${_id}" >
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <select class="chip ${priority === Priorities.FIRST ? "primary" : priority === Priorities.SECOND ? "secondary" : "select"}">
                          <option value="0" ${priority === Priorities.NONE ? "selected" : ""}>순위</option>
                          <option value="1" ${priority === Priorities.FIRST ? "selected" : ""}>1순위</option>
                          <option value="2" ${priority === Priorities.SECOND ? "selected" : ""}>2순위</option>
                        </select>
                      </div>
                      <span class="label-content">${contents}</span>
                    </label>
                    <button class="destroy"></button>
                  </div>
                  <input class="edit" value="${contents}" />
                </li>`
    }

};
/*const todoItemFactory = new TodoItemFactory({
    _id: "bpikr82Ca",
    name: "eastjun",
    todoList: [
        {
            _id: "3ZaDhLJKe",
            contents: "asd",
            isCompleted: false,
            priority: 0
        },
        {
            _id: "kExK7O6nA",
            contents: "qwd",
            isCompleted: false,
            priority: 0
        },
        {
            _id: "XaDnwG3Ck",
            contents: "xcvx",
            isCompleted: false,
            priority: 0
        }
    ]
});
const frame = todoItemFactory.build();
document.querySelector(".todoapp-list-container").prepend(frame);*/

