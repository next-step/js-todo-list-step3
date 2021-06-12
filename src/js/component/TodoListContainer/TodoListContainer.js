import team from '../../store/team.js';
import Title from '../Title.js';
import TodoList from './TodoList/TodoList.js';

export default function TodoListContainer() {
  this.$app = document.querySelector('#app');
  this.dom = {};

  this.setDom = () => {

  }










  this.$todoListContainer = document.createElement('ul');
  this.$todoListContainer.classList.add(['todoapp-container', 'flex-column-container']);
  this.$app.prepend(this.$todoListContainer);
  
  this.selectedTeam = {};
  this.title = {};
  this.todoList = {};
  this.members = [];

  this.init = async () => {
    console.log(this.$todoListContainer);
    await this.drawComponent();
    await this.setState();
    
    this.render();
  }

  this.setState = async () => { 
    const urlParams = new URLSearchParams(window.location.search);
    const selectedTeamId = urlParams.get('id');
    console.log(selectedTeamId);
    this.selectedTeam = await team.get(selectedTeamId);
    this.members = this.selectedTeam.members;
    console.log(this.members);
    this.title.setState(this.selectedTeam.name);
  }

  this.drawComponent = () => {
    this.title = new Title(this.$app);
    this.todoLists = this.members.map(member => new TodoList(
      this.$todoListContainer,
      member
      ));
    }

  this.render = () => {
    this.title.render();
    this.todoLists.render();
  }

} 

new TodoListContainer().init();
