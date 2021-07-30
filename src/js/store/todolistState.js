import subject from "../core/Subject.js";

export default class TodoListState extends subject {
    constructor(memberID){
        super();
        this.memberID = memberID;
        this.todoList = [];
    }
    getList(){
        return this.todoList;
    } 
    setList(updateList){
        this.todoList = updateList;
        this.publish();
    }
    getMemberId(){
        return this.memberID;
    }
}