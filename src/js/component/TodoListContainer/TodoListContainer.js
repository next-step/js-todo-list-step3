import team from '../../store/team.js';
import Title from '../Title.js';
import TodoList from './TodoList/TodoList.js';

export default function TodoListContainer() {
  this.$app = document.querySelector('#app');
  this.$todoListContainer = document.createElement('ul');
  this.$todoListContainer.classList.add(['todoapp-container', 'flex-column-container']);
  this.$app.prepend(this.$todoListContainer);
  
  this.selectedTeam = {};
  this.title = {};
  this.todoList = {};
  this.members = [];

  this.init = async () => {
    console.log(this.$todoListContainer);
    await this.setState();
    await this.drawComponent();
    this.render();
  }

  this.setState = async () => { 
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTeamId = urlParams.get('id');
    console.log(selectedTeamId);
    this.selectedTeam = await team.get(selectedTeamId);
    this.members = this.selectedTeam.members;
    console.log(this.members);
  }

  this.drawComponent = () => {
    this.title = new Title(this.$app, this.selectedTeam.name);
    this.todoLists = this.members.map(member => new TodoList(
      this.$todoListContainer,
      member,
      
      ));
    }

  this.render = () => {
    this.title.render();

  }

} 

new TodoListContainer().init();
