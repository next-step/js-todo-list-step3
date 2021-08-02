import { $ } from "../util/util.js";

export class Title{
   constructor(teamName){
       this.title = teamName;
       this.render();
   }  
   template(){
        return `
        <span><strong>${this.title}</strong>'s Todo List</span>
        `
   }
   render(){
       const target = $("#user-title");
       target.innerHTML = this.template();
   }
}