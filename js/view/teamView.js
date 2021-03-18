'use strict';

import { $ } from '../utils/dom.js';
import { teamBtnTemplate, teamAddBtnTemplate } from '../layout/templates.js';

class TeamView {
  constructor() {
    this.$teamListContainer = $('.team-list-container');
  }

  renderTeamBtns(teams) {
    this.$teamListContainer.innerHTML = teams
      .map(team => teamBtnTemplate(team))
      .join('');
    this.$teamListContainer.innerHTML += teamAddBtnTemplate();
  }
}

export default TeamView;
