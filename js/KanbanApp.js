import KanbanTeamTitle from './KanbanTeamTitle.js';
import KanbanMemberList from './KanbanMemberList.js';
import KanbanMemberInput from './KanbanMemberInput.js';
import KanbanTodoInput from './KanbanTodoInput.js';
import rootApi from './api/apiHandler.js';
import KanbanTodoList from './KanbanTodoList.js';
import KanbanTodoFilter from './KanbanTodoFilter.js';
import KanbanTodoCount from './KanbanTodoCount.js';
import * as functions from './util/functions.js';

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
        this.kanbanMemberList.render();
      },
    });

    this.kanbanTodoInput = new KanbanTodoInput({
      teamId,
      $targetTodoAppListContainer,
      onAddTodoItem: async (memberId, todo) => {
        await rootApi.fetchMemberAddTodoItem(this.teamId, memberId, todo);
        this.kanbanMemberList.render();
      },
    });

    this.kanbanTodoList = new KanbanTodoList({
      teamId,
      memberId: '',
      $targetTodoAppListContainer,
      onToggleTodoItem: async (memberId, itemId) => {
        await rootApi.fetchToggleTodoItem(this.teamId, memberId, itemId);
        this.kanbanTodoList.render();
      },
      onDeleteTodoItem: async (memberId, itemId) => {
        await rootApi.fetchDeleteTodoItem(this.teamId, memberId, itemId);
        this.kanbanTodoList.render();
      },
      onUpdateTodoItem: async (memberId, itemId, todo) => {
        await rootApi.fetchUpdateTodoItem(this.teamId, memberId, itemId, todo);
        this.kanbanTodoList.render();
      },
      onPriorityTodoItem: async (memberId, itemId, priority) => {
        await rootApi.fetchPriorityTodoItem(
          this.teamId,
          memberId,
          itemId,
          priority,
        );
        this.kanbanTodoList.render();
      },
    });

    this.kanbanTodoCount = new KanbanTodoCount({
      memberId: '',
      filteredTodoList: [],
      $targetTodoAppListContainer,
    });

    this.kanbanTodoFilter = new KanbanTodoFilter({
      teamId,
      memberId: '',
      filteredTodoList: [],
      $targetTodoAppListContainer,
      onDeleteAllTodoItems: async (memberId) => {
        await rootApi.fetchDeleteAllTodoItems(this.teamId, memberId);
        this.kanbanTodoList.setState(memberId);
      },
      onSelectFilter: async (memberId, hash) => {
        const { todoList } = await rootApi.fetchMemberTodoList(
          this.teamId,
          memberId,
        );
        this.filteredTodoList = functions.filteringTodoList(hash, todoList);
          console.log(this.filteredTodoList)
        this.kanbanTodoFilter.setState(this.filteredTodoList);
        this.kanbanTodoCount.setState(this.filteredTodoList);
      },
    });
  }

  setState() {}

  render() {}
}
