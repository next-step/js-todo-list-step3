import { API } from "../API.js"

import {initAddTeam} from "./AddTeam.js"
import {initDeleteTeam} from "./DeleteTeam.js"

export const $teamListContainer = document.querySelector('.team-list-container');


const initTeamList = () =>{
  initAddTeam();
  initDeleteTeam();
  getAllTeams();
};


export const getAllTeams = async () => {
  let post = await API.getTeams();
  clearTeamList();
  
  post.forEach(data=>{
    assembleTeamCard(data)
  });
}

const clearTeamList = () =>{
  const cards = $teamListContainer.querySelectorAll('.team-card-container');
  cards.forEach((item)=>{
    item.remove();
  })
}

const assembleTeamCard = async (data) =>{
  const template = `<div class="team-card-container" id=${data._id}>
                      <a href="kanban.html#${data._id}#all" class="card">
                        <div class="card-title">
                          ${data.name}
                        </div>
                      </a>
                    </div>`;
  $teamListContainer.insertAdjacentHTML("afterbegin",template);
}


initTeamList();