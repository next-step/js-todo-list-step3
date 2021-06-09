import api from './api/index.js';

const $addTeamButton = document.querySelector('#add-team-button')
$addTeamButton.addEventListener('click', () => {
  const result = prompt('팀 이름을 입력해주세요')
})

const teamList = async () => {
  const temp = await api.team.getList();
  console.log(temp);
  console.log(temp[0]._id);
  const team = await api.team.get(temp[0]._id);
  console.log(team);
};

teamList();


const addTeam = async (name) => {
  const newTeam = await api.team.add({name});
  console.log(newTeam);
}

//addTeam('Dorr123');


const deleteTeam = async (teamId) => {
  const newTeam = await api.team.delete(teamId);
  console.log(newTeam);
}

//deleteTeam('ctIa8wzm1');
/*
const teamId = teamList()[0]._id;


const team = api.team.getTeam(teamId);


console.log(team);
*/