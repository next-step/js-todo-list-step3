import Title from '../components/common/Title.js';
import TeamListContainer from '../components/team/TeamListContainer.js';

import { $ } from '../util/selector.js';

class App {
  constructor() {
    new Title($('#user-title'));
    new TeamListContainer($('.team-list-container'));
  }
}

new App();
