import KanbanTeamTitle from './KanbanTeamTitle.js';
import KanbanMemberList from './KanbanMemberList.js';
import KanbanMemberInput from './KanbanMemberInput.js';
import KanbanTodoInput from './KanbanTodoInput.js';
import rootApi from './api/apiHandler.js';
import KanbanTodoList from './KanbanTodoList.js';

export default class KanbanApp {
  constructor({
    teamName,
    teamId,
    $targetTeamTitle,
    $targetTodoAppListContainer,
  }) {
    this.teamName = teamName;
    this.teamId = teamId;
    this.$targetTeamTitle = $targetTeamTitle;
    this.$targetTodoAppListContainer = $targetTodoAppListContainer;

    this.kanbanTeamTitle = new KanbanTeamTitle({
      teamName,
      $targetTeamTitle,
    });

    this.kanbanMemberList = new KanbanMemberList({
      teamId,
      $targetTodoAppListContainer,
    });

    this.kanbanMemberInput = new KanbanMemberInput({
      teamId,
      $targetTodoAppListContainer,
      onAddMember: async (addMember) => {
        await rootApi.fetchAddMember(this.teamId, addMember);
        await this.kanbanMemberList.render();
      },
    });

    this.kanbanTodoInput = new KanbanTodoInput({
      teamId,
      $targetTodoAppListContainer,
      onAddTodoItem: async (memberId, todo) => {
        await rootApi.fetchMemberAddTodoItem(this.teamId, memberId, todo);
        await this.kanbanMemberList.render();
      },
    });

    this.kanbanTodoList = new KanbanTodoList({
      teamId,
      memberId: '',
      $targetTodoAppListContainer,
      onToggleTodoItem: async (memberId, itemId) => {
        await rootApi.fetchToggleTodoItem(this.teamId, memberId, itemId);
        this.kanbanTodoList.render()
      },
      onDeleteTodoItem: async (memberId, itemId) => {
        await rootApi.fetchDeleteTodoItem(this.teamId, memberId, itemId);
        this.kanbanTodoList.render()

      },
      onUpdateTodoItem: async (memberId, itemId, todo) => {
        await rootApi.fetchUpdateTodoItem(this.teamId, memberId, itemId, todo);
        this.kanbanTodoList.render()
      },
      onPriorityTodoItem: async (memberId, itemId, priority) => {
        await rootApi.fetchPriorityTodoItem(this.teamId, memberId, itemId, priority);
        this.kanbanTodoList.render()
      }
    });
  }

  setState() {}

  render() {}
}
