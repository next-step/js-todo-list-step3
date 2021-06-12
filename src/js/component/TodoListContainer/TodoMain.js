import team from '../../store/team.js';
import Title from '../Title.js';
import TodoContainer from './TodoContainer/index.js';
import AddMemberBtn from './AddMemberBtn.js';
import api from '../../api/index.js';

export default function TodoMain() {
  this.$app = document.querySelector('#app');
  this.dom = {};
  this.selectedTeam = {};
  this.title = {};
  this.todoList = {};
  this.members = [];
  this.todoLists = {};
  this.addMemberBtn = {};
  this.selectedTeamId = '';

  this.setDom = () => {
    this.dom = document.createElement('ul');
    this.dom.className ='todoapp-container';
    this.dom.classList.add('flex-column-container');
    this.$app.prepend(this.dom);
  }

  this.init = async () => {
    await this.load();
    this.setDom();
    this.drawComponent();
    this.setState();
  }

  this.load = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    this.selectedTeamId = urlParams.get('id');
    this.selectedTeam = await team.get(this.selectedTeamId);
    this.members = this.selectedTeam.members;
  }

  this.setState = () => { 
    this.title.setState(this.selectedTeam.name);
    this.todoLists.forEach( (todoList, index) => {
      todoList.setState(this.members[index], this.selectedTeamId);
    });
    this.addMemberBtn.setState();
  }

  this.drawComponent = () => {
    this.title = new Title(this.$app, 'h1', 'team-title');
    
    this.todoLists = this.members.reverse().map(member => new TodoContainer(this.dom, member))
    
    this.addMemberBtn = new AddMemberBtn(
      this.dom,
      {onAdd: async (name) => {
        const temp = await api.member.addMember(this.selectedTeamId, {name});
        console.log(temp);
      }},
    );

  }

} 

new TodoMain().init();
