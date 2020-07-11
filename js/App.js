import { getTeamDetail, addMember } from './api/index.js';
import { memberTodosTemplate, memberAddItemTemplate } from './template.js';

function App() {
  this.teamId = '';
  this.teamName = '';
  this.members = '';

  const $teamTitle = document.querySelector('#team-title');
  const $memberTodoList = document.querySelector('#member-todo-list');

  this.inputMemberNameAndSend = async () => {
    const memberName = prompt('새로운 팀원 이름을 입력해주세요');
    if (!memberName) return;
    const { error, errorMessage } = await this.addMember(memberName);
    if (error) return alert(errorMessage);
    this.getTeamDetail();
  }

  this.addMember = async memberName => {
    const { result, error, errorMessage } = await addMember(this.teamId, memberName);
    if (error) return alert(errorMessage);
    return result;
  }

  this.getTeamDetail = async () => {
    const { result, error, errorMessage } = await getTeamDetail(this.teamId);
    if (error) return alert(errorMessage);
    this.setState(result);
  }

  this.setState = data => {
    this.teamId = data._id;
    this.teamName = data.name;
    this.members = data.members;
    this.render();
  }

  this.render = () => {
    $teamTitle.querySelector('strong').innerHTML = this.teamName;
    $memberTodoList.innerHTML = this.members.map(item => memberTodosTemplate(item)).join('') + memberAddItemTemplate();
  }

  this.init = () => {
    let params = (new URL(document.location)).searchParams;
    let teamId = params.get('id');
    this.teamId = teamId;
    this.getTeamDetail();
  }

  

  const $todoApps = document.querySelector('.todoapp-list-container')
  $todoApps.addEventListener('click', e => {
    const $target = e.target
    const targetClassList = $target.classList
    if (targetClassList.contains('chip')) {
      const $chipSelect = $target.closest('.chip-container').querySelector('select')
      $target.classList.add('hidden')
      $chipSelect.classList.remove('hidden')
    }
  })

  $memberTodoList.addEventListener('click', event => {
    if (event.target.closest('#add-user-button')) {
      this.inputMemberNameAndSend();
    }
  });
}

const app = new App();
app.init();
