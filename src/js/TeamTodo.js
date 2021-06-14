import team from './store/team.js'

function TeamTodo() {
  this.$teamTodoApps = document.querySelector('#app');
  this.teams = ''
  
  this.init = async() => {
    this.teams = await team.getList(); 
  }

}
new TeamTodo().init();