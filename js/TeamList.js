import { API } from "./API.js"
import {MINIMUN_INPUT_LENGTH} from "./AddNewItem.js"


const $teamListContainer = document.querySelector('.team-list-container');
const $addTeamButton = document.querySelector('#add-team-button');

const initTeamList = () =>{

  $addTeamButton.addEventListener('click', addNewTeam);
  $teamListContainer.addEventListener('auxclick', deleteCurrentTeam);
  getAllTeams();
};



const addNewTeam = async () =>{
    const result = prompt('팀 이름을 입력해주세요')
    if(result===null) return;
    if(result.length<MINIMUN_INPUT_LENGTH){
      alert(`${MINIMUN_INPUT_LENGTH} 글자 이상 입력해주세요!`);
      return;
    }
    await API.postTeam(result);
    
    getAllTeams();
}

const deleteCurrentTeam = async ({target}) =>{
      if(!target.classList.contains('add-team-button-container')){
        if(confirm('정말 이 팀을 삭제하시겠습니까?')){
          const teamId = target.closest('div').getAttribute('id');
          await API.deleteTeam(teamId);
          getAllTeams();
        }
      }
}

const getAllTeams = async () => {
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
                      <a href="kanban.html#${data._id}" class="card">
                        <div class="card-title">
                          ${data.name}
                        </div>
                      </a>
                    </div>`;
  $teamListContainer.insertAdjacentHTML("afterbegin",template);
  
}


initTeamList();