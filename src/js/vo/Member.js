import { TodoItem } from "./TodoItem";

export class Member {
    constructor({ _id, name, todoList =[]}) {
      this._id = _id;
      this.name = name;
      this.todoList=todoList.map(todo => new TodoItem(todo));
    }
  }
  