import subject from "../core/Subject.js";

export default class TodoListState extends subject {
    constructor(){
        super();
        this.todoList = [];
    }
    get(){
        return this.todoList;
    } 
    set(updateList){
        this.todoList = updateList;
        this.publish();
    }
}