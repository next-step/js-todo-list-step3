import { teamTitleTemplate } from '../utils/templates.js';

export default class MemberTitle {
  constructor({ teamName, $targetTeamTitle }) {
    this.teamName = teamName;
    this.$targetTeamTitle = $targetTeamTitle;

    this.render()
  }

  render() {
    this.$targetTeamTitle.innerHTML = teamTitleTemplate(this.teamName);
  }
}
