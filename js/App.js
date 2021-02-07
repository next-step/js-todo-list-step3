import {responseMemberApi} from "./server/Server.js"
import {kanbanHeader,$baseUrl} from "./content/shape.js";

let  $domTodoAppListContainer;
const $teamId = window.location.href.slice(window.location.href.length-9,window.location.href.length)

function getTeamNameAndTodoList($teamId){
  fetch(`${$baseUrl}api/teams`)
    .then((response)=>response.json())
    .then((data)=>{
      data.forEach(team=>{
        if(team._id === $teamId){
          document.body.innerHTML += kanbanHeader(team.name);
        }
      })
    })
    .then(()=>{
      $domTodoAppListContainer = document.querySelector('.todoapp-list-container');
      responseMemberApi($domTodoAppListContainer,$teamId);
    })
}

getTeamNameAndTodoList($teamId)


