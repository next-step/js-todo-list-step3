import Title from '../components/common/Title.js';
import TeamListContainer from '../components/team/TeamListContainer.js';
import Component from '../core/Component.js';

import { $ } from '../util/selector.js';

class App extends Component {
  mounted() {
    new Title($('#user-title'), { title: 'Team' });
    new TeamListContainer($('.team-list-container'));
  }

  template() {
    return `
      <h1 id="user-title"></h1>
      <div class="team-list-container"></div>
    `;
  }
}

new App($('#app'));
