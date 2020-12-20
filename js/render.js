import App from './components/app.js';
import {
  getTeamList
} from './util/api.js';
import {
  common, teamBoard,
} from './constant/template.js'

class Renderer {
  constructor(app) {
    this.app = app;
  }

  render() {
    this._render();
  }

  _render() {
    console.log('must be override');
  }
}


class DOMRenderer extends Renderer {
  constructor(id, app) {
    super(app);
    this.init(id);
    // this.isEditMode = false;
    this.$app.insertAdjacentHTML('afterbegin', common.title());
    this.$title = this.$app.querySelector('#user-title strong');
    this.$teamList = this.$app.querySelector('.team-list-container');
  }

  async init(id) {
    this.$app = document.querySelector('#' + id);
    const teamList = await getTeamList();
    this.app = App.load(teamList);
    this.render();
  }


  _render() {
    const teams = this.app.getTeams();
    teams.forEach((team) => {
      this.$teamList.insertAdjacentHTML('beforeend',teamBoard.teamCard(team.getInfo().name));
    });

  }
}

new DOMRenderer('app', new App());
