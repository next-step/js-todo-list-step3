import subject from "../core/Subject.js";

export default class TodoListState extends subject {
    constructor(memberID){
        super();
        this.memberID = memberID;
        this.todoList = [];
    }
    getTodo(){
        return this.todoList;
    }
    setTodo(updateList){
        this.todoList = updateList;
        this.publish();
    }
    getMemberID(){
        return this.memberID;
    }
}