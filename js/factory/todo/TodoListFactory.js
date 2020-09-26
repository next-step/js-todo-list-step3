import { AbstTodoListFactory } from "../AbstTodoListFactory.js";
import { Priorities } from "../../data/constant.js";
import { toHtml } from "../../utils/utils.js";
import { FooterTab } from "../../data/constant.js";

export const TodoListFactory = class extends AbstTodoListFactory {

    constructor(state) {
        super(state);
    }

    _title() {
        const { name } = this.state;
        this.frame.append(toHtml(`<h2><span><strong>${name}</strong>'s Todo List</span>\
                                        <button class="btn-remove-member" type="button">⌫</button></h2>`));
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
        const tab = this.state.tab||FooterTab.ALL;
        this.frame.querySelector(".todoapp")
            .append(toHtml(`<div class="count-container">
              <span class="todo-count">총 <strong>${todoList.length}</strong> 개</span>
              <ul class="filters" data-current-tab="${tab?tab:FooterTab.ALL}">
                <li> <a data-tab="${FooterTab.ALL}" class="${tab?tab===FooterTab.ALL?"selected":"":""}" href="#all">전체보기</a> </li>
                <li> <a data-tab="${FooterTab.PRIORITY}" class="${tab?tab===FooterTab.PRIORITY?"selected":"":""}" href="#priority">우선 순위</a> </li>
                <li> <a data-tab="${FooterTab.ACTIVE}" class="${tab?tab===FooterTab.ACTIVE?"selected":"":""}" href="#active">해야할 일</a> </li>
                <li> <a data-tab="${FooterTab.COMPLETED}" class="${tab?tab===FooterTab.COMPLETED?"selected":"":""}" href="#completed">완료한 일</a> </li>
              </ul>
              <button class="clear-completed">모두 삭제</button>
            </div>`))
    }

    _frame() {
        const { _id } = this.state;
        return `<li class="todoapp-container" data-container-index="${_id}"></li>`;
    }

    items(values, filter=null) {
        return values.map(obj=>{
            if (filter) {
                switch (filter) {
                    case FooterTab.PRIORITY:{

                        break;
                    }
                    case FooterTab.ACTIVE:{

                        break;
                    }
                    case FooterTab.COMPLETED:{

                        break;
                    }
                }
            }
            return this.item(obj);
        }).join('');
    }

    item({ _id, contents, isCompleted, priority }) {
        return `<li class="todo-list-item ${isCompleted ? "completed" : ""}" data-todo-idx="${_id}" >
                  <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">
                      <div class="chip-container">
                        <select class="chip ${priority === Priorities.FIRST ? "primary" : priority === Priorities.SECOND ? "secondary" : "select"}">
                          <option value="${Priorities.NONE}" ${priority === Priorities.NONE ? "selected" : ""}>순위</option>
                          <option value="${Priorities.FIRST}" ${priority === Priorities.FIRST ? "selected" : ""}>1순위</option>
                          <option value="${Priorities.SECOND}" ${priority === Priorities.SECOND ? "selected" : ""}>2순위</option>
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
/*const todoItemFactory = new TodoListFactory({
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

