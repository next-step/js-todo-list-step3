import {responseMemberApi,id, clickTeamEventHandler} from "./server/Server.js"
import {kanbanHeader} from "./content/shape.js";

document.body.innerHTML += kanbanHeader('abc')
const $domTodoAppListContainer = document.querySelector('.todoapp-list-container');
const $teamId = window.location.href.slice(window.location.href.length-9,window.location.href.length)
responseMemberApi($domTodoAppListContainer,$teamId);

