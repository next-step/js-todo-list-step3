import Component from '../../core/Component.js';
import store from '../../Store.js';
import { qs } from '../../util/helpers.js';
import TeamCard from './TeamCard.js';

export default class TeamSection extends Component {
  constructor($element) {
    super($element);

    this.state = {
      teamList: [],
      loading: true,
    };

    this.render();
  }

  async setup() {
    const teamList = await store.getTeamList();

    this.setState({
      loading: false,
      teamList,
    });
  }

  addTeam() {
    console.log('클릭!');
  }

  mounted() {
    if (!this.state.loading) {
      new TeamCard(qs('.team-list-container'), {
        teamList: this.state.teamList,
        addTeam: this.addTeam.bind(this),
      });
    }
  }

  template() {
    if (this.state.loading) return `<div class="loading"></div>`;
    return `
    <h1 id="user-title">
      <span><strong>Team</strong>'s Todo Lists</span>
    </h1>
    <div class="team-list-container"></div>
    `;
  }
}
