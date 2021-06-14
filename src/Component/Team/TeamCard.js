import Component from '../../core/Component.js';
import TeamButton from './TeamButton.js';

export default class TeamCard extends Component {
  constructor($element, props) {
    super($element, props);
    this.teamList = this.props.teamList;
    this.addTeam = this.props.addTeam;

    this.render();
  }

  template() {
    return this.teamList
      .map(
        ({ _id, name }) => `
    <div class="team-card-container">
        <a href="#detail/${_id}" class="card">
            <div class="card-title">
                ${name}
            </div>
        </a>
    </div>
    `
      )
      .join('');
  }

  mounted() {
    new TeamButton(this.$element, { addTeam: this.addTeam });
  }
}
