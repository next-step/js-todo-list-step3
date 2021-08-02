//import Observer from "../core/observer.js";
import { $ } from "../../util/util.js";
import { teamAPI, memberAPI } from "../../api/api.js";


export class TodoInput {
    constructor(todolistState){
        this.todolistState =  todolistState;
        this.addEvent();
        
    }
    update(){

    }
    addEvent(){
       const target = document.getElementById(`input${this.todolistState.getMemberID()}`);
       target.addEventListener('keyup', this.onAddTodo.bind(this));
    }
    async onAddTodo(e){
        if(e.key==='Enter'){
            const value = e.target.value;
            const memberId = this.todolistState.getMemberID();
            if(value.length < 2 ){
                alert("콘텐츠의 길이는 최소 2글자이상이어야 합니다.");
                return;
            }
            const teamID= $('#user-title').dataset.id;
            const contents = {"contents":e.target.value};
            await memberAPI.postMemberTodo(teamID,memberId,contents);
            //(id, {"contents":value});
            const data = await memberAPI.getMemberTodoList(teamID, memberId);
            this.todolistState.setTodo(data.todoList);
            e.target.value = "";
        }   
    }
}
