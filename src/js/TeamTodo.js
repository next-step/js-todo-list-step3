import team from './store/team.js'

function TeamTodo() {
  this.$teamTodoApps = document.querySelector('#app');
  this.teams = ''
  
  this.init = async() => {
    this.teams = await team.getList() 
    console.log(this.teams);
  }

}
new TeamTodo().init();