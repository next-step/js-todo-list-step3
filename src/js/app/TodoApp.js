import { TodoInput } from "../component/todo/TodoInput.js";
import { TodoList } from "../component/todo/TodoList.js";
import { TodoStatusContainer } from "../component/todo/TodoStatusContainer.js";
import { $,$$ } from "../util/domSelection.js";

export class TodoApp {
  constructor(){
    this.todoInput = new TodoInput();
    this.todoList = new TodoList();
    this.todoStatusContainer = new TodoStatusContainer();
  }

  renderAll({memberId,todoList,filterState}) {
    const todoAppStructure =
    `<div class="todoapp">
      <section class="input-container">:TodoInput:</section>
      <section class="main">
        <ul class="todo-list">:TodoList:</ul>
      </section>
      <div class="count-container">:TodoStatusContainer:</div>
    </div>`;
    let $todoAppContainer = null;
    $$('li.todoapp-container').forEach((li)=>{
      if(li.dataset.memberid == memberId){
        $todoAppContainer=li;
        return;
      }
    })
    const [todoApp] =  $$('div.todoapp',$todoAppContainer);
    if(!todoApp){
      $todoAppContainer.insertAdjacentHTML('beforeend', todoAppStructure);
    }

    this.todoInput.render($todoAppContainer);
    this.todoList.render(todoList,$todoAppContainer);
    this.todoStatusContainer.render(filterState,$todoAppContainer);
  }
}
