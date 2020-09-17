import {TodoItem} from "./TodoItem";

export interface TodoMember {
  _id: string;
  name: string;
  todoList: TodoItem[]
}

export interface TodoMemberVO {
  name: string;
}
