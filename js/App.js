import TeamBoard from './TeamBoard.js';
import TodoBoard from './TodoBoard.js';
export default class App {
  constructor(currentPath) {
    switch (currentPath) {
      case '/index.html':
        this.teamBoard = new TeamBoard();
        break;
      case '/kanban.html':
        this.todoBoard = new TodoBoard();
        break;
    }
  }
}
