import Team from '../../components/team/team.js';
import DataLoader from '../../services/dataLoader.js';

export default class App {
  constructor($target, dataController) {
    this.dataLoader = new DataLoader(document.body, dataController);
    this.team = new Team(document.querySelector('.team-list-container'), this.dataLoader);
  }
}
