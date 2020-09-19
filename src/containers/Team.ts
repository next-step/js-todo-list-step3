import {Component} from "@/core";
import {TeamList} from "@/components/Team/TeamList";
import {FETCH_TEAMS, teamStore} from "@/store/teamStore";
import {TeamAppendForm} from "@/components/Team/TeamAppendForm";

export const Team = class extends Component {

  protected async componentInit() {
    await teamStore.dispatch(FETCH_TEAMS);

    this.$children = {
      TeamList: { constructor: TeamList },
      TeamAppendForm: { constructor: TeamAppendForm },
    }
  }

  protected template () {
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo Lists</span>
      </h1>
      <div data-component="TeamList" class="team-list-container"></div>
      <div data-component="TeamAppendForm" id="team-append-form"></div>
    `;
  }

}
