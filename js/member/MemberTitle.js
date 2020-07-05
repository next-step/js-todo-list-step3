import { TeamTitleTemplate } from '../util/templates.js';

export default class MemberTitle {
  constructor({ teamName, $targetTeamTitle }) {
    this.teamName = teamName;
    this.$targetTeamTitle = $targetTeamTitle;

    this.render()
  }

  render() {
    this.$targetTeamTitle.innerHTML = TeamTitleTemplate(this.teamName);
  }
}
