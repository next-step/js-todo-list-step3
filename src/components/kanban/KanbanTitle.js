import { DOM_ID } from '../../constants/constants';
import { $ } from '../../utils/utils';
import teamState from '../../store/teamState';

export default class KanbanTitle {
  constructor() {
    $(DOM_ID.TEAM_TITLE).innerHTML = `
        <span><strong>${teamState.get().teamName}</strong>'s Todo List</span>
    `;
  }
}
