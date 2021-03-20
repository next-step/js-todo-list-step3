'use strict';

import { $ } from '../utils/dom.js';
import {
  teamBtnTemplate,
  teamAddBtnTemplate,
} from '../layout/teamTemplates.js';

class TeamView {
  constructor() {
    this.$teamListContainer = $('.team-list-container');
  }

  render(teams) {
    this.$teamListContainer.innerHTML = teams
      .map(team => teamBtnTemplate(team))
      .join('');
    this.$teamListContainer.innerHTML += teamAddBtnTemplate();
  }
}

export default TeamView;
