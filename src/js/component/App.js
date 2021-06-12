
import Title from './Title.js';
import TodoListContainer from './TodoListContainer/TodoListContainer.js';
import team from '../store/team.js';

export default function TeamTodoApp() {
  this.$app = document.querySelector('#app');
  //this.title = {};
  this.todoListContainer = {};
  //this.selectedTeam = {};

  this.init = async () => {
   // await this.setState();
    await this.drawComponent();
    this.render();
  }

  this.setState = async () => {
    this.todoListContainer.setState()
  }

  this.drawComponent = () => {
    //this.title = new Title(this.$app, this.selectedTeam.name);
    this.todoListContainer = new TodoListContainer(this.$app, 'ul');
  }

  this.render = () => {
    this.todoListContainer.render();
  }

}
  
new TeamTodoApp().init();