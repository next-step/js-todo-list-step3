import Component from '../../core/Component.js';
import store from '../../Store.js';
import { getTeamId, qs } from '../../util/helpers.js';
import DetailTodoList from './DetailTodoList.js';

const priorityType = {
  0: 'NONE',
  1: 'FIRST',
  2: 'SECOND',
};

export default class DetailSection extends Component {
  constructor($element) {
    super($element);

    this.state = {
      members: [],
      loading: true,
    };
  }

  async addTeamTodoItem(memberId, contents) {
    const teamId = getTeamId();
    await store.addTeamTodoItem(teamId, memberId, contents);
    this.setup();
  }

  async changeTeamTodoItemPriority(memberId, itemId, priorityNum) {
    const priority = priorityType[priorityNum];
    const teamId = getTeamId();
    await store.changeTeamTodoItemPriority(teamId, memberId, itemId, priority);
    this.setup();
  }

  async toggleTeamTodoItem(memberId, itemId) {
    const teamId = getTeamId();
    await store.toggleTeamTodoItem(teamId, memberId, itemId);
    this.setup();
  }

  async deleteTeamTodoItem(memberId, itemId) {
    const teamId = getTeamId();
    await store.deleteTeamTodoItem(teamId, memberId, itemId);
    this.setup();
  }

  async setup() {
    const teamId = getTeamId();
    const members = await store.getTeamMember(teamId);
    this.setState({
      members: members.members,
      teamName: members.name,
      loading: false,
    });
  }

  template() {
    if (this.state.loading) return `<div class="loading"></div>`;
    return `
    <h1 id="user-title" data-username="eastjun">
        <span><strong>${this.state.teamName}</strong>'s Todo Lists</span>
    </h1>
    <ul class="todoapp-list-container flex-column-container">
    </ul>
    `;
  }

  mounted() {
    if (!this.state.loading) {
      new DetailTodoList(qs('.todoapp-list-container', this.$element), {
        members: this.state.members,
        addTeamTodoItem: this.addTeamTodoItem.bind(this),
        changeTeamTodoItemPriority: this.changeTeamTodoItemPriority.bind(this),
        toggleTeamTodoItem: this.toggleTeamTodoItem.bind(this),
        deleteTeamTodoItem: this.deleteTeamTodoItem.bind(this),
      });
    }
  }
}
