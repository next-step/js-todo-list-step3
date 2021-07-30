import { $ } from "../util/util.js";

export default class Title{
   constructor(prop){
       this.teamName = prop;
       console.log(prop)
        this.render();
   }  
   template(){
        const name = this.teamName;
        console.log(name)
        return `
        <span><strong>${name}</strong>'s Todo List</span>
        `
   }
   render(){
       const target = $("#user-title");
       target.innerHTML = this.template();
   }
}