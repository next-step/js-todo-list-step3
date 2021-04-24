
export class TeamApp {
  async init() {
  }
 
  setState() {
    if (this.todoList) {
      this.todoList.setState(this.todoItemArray);
    }
    if (this.todoStatusContainer) {
      this.todoStatusContainer.setState(this.filterState);
    }
    if (this.userList) {
      this.userList.setState(this.userListArray,this.currentUser);
    }
  }
}
