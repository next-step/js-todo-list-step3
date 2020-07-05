import MemberTitle from './MemberTitle.js';
import MemberList from './MemberList.js';
import MemberInput from './MemberInput.js';
// import MemberTodoInput from './MemberTodoInput.js';
import rootApi from '../api/apiHandler.js';
// import MemberTodoList from './MemberTodoList.js';
// import MemberTodoFilter from './MemberTodoFilter.js';
// import MemberTodoCount from './MemberTodoCount.js';
import * as functions from '../util/functions.js';
import TodoApp from '../todo/TodoApp.js';
import { ERROR_TYPE } from '../util/constants.js';

export default class MemberApp {
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

    this.MemberTeamTitle = new MemberTitle({
      teamName: this.teamName,
      $targetTeamTitle,
    });

    this.MemberMemberList = new MemberList({
      teamId,
      $targetTodoAppListContainer,
    });

    this.MemberMemberInput = new MemberInput({
      teamId,
      $targetTodoAppListContainer,
      onAddMember: async (addMember) => {
        await rootApi.fetchAddMember(this.teamId, addMember);
        this.MemberMemberList.render();
        this.makeInstanceTodo();
      },
    });

    // this.kanbanTodoInput = new KanbanTodoInput({
    //   teamId,
    //   $targetTodoAppListContainer,
    //   onAddTodoItem: async (memberId, todo) => {
    //     await rootApi.fetchMemberAddTodoItem(this.teamId, memberId, todo);
    //     // this.kanbanMemberList.render();
    //     this.kanbanTodoList.render();

    //   },
    // });

    // this.kanbanTodoList = new KanbanTodoList({
    //   teamId,
    //   memberId: '',
    //   $targetTodoAppListContainer,
    //   onToggleTodoItem: async (memberId, itemId) => {
    //     await rootApi.fetchToggleTodoItem(this.teamId, memberId, itemId);
    //     this.kanbanTodoList.render();
    //   },
    //   onDeleteTodoItem: async (memberId, itemId) => {
    //     await rootApi.fetchDeleteTodoItem(this.teamId, memberId, itemId);
    //     this.kanbanTodoList.render();
    //   },
    //   onUpdateTodoItem: async (memberId, itemId, todo) => {
    //     await rootApi.fetchUpdateTodoItem(this.teamId, memberId, itemId, todo);
    //     this.kanbanTodoList.render();
    //   },
    //   onPriorityTodoItem: async (memberId, itemId, priority) => {
    //     await rootApi.fetchPriorityTodoItem(
    //       this.teamId,
    //       memberId,
    //       itemId,
    //       priority,
    //     );
    //     this.kanbanTodoList.render();
    //   },
    // });

    // this.kanbanTodoCount = new KanbanTodoCount({
    //   memberId: '',
    //   filteredTodoList: [],
    //   $targetTodoAppListContainer,
    // });

    // this.kanbanTodoFilter = new KanbanTodoFilter({
    //   teamId,
    //   memberId: '',
    //   filteredTodoList: [],
    //   $targetTodoAppListContainer,
    //   onDeleteAllTodoItems: async (memberId) => {
    //     await rootApi.fetchDeleteAllTodoItems(this.teamId, memberId);
    //     this.kanbanTodoList.setState(memberId);
    //   },
    //   onSelectFilter: async (memberId, hash) => {
    //     const { todoList } = await rootApi.fetchMemberTodoList(
    //       this.teamId,
    //       memberId,
    //     );
    //     this.filteredTodoList = functions.filteringTodoList(hash, todoList);
    //     this.kanbanTodoFilter.setState(this.filteredTodoList);
    //     this.kanbanTodoCount.setState(this.filteredTodoList);
    //   },
    // });
    this.makeInstanceTodo();
  }

  async makeInstanceTodo() {
    try {
      console.log(this.teamId);
      const { members } = await rootApi.fetchTeam(this.teamId);
      console.log(members);
      const $targetTodoApps = document.querySelectorAll('.todoapp');
      console.log($targetTodoApps);
      await members.map(
        (member, index) =>
          new TodoApp({
            data: members[index],
            teamId: this.teamId,
            memberId: member._id,
            $target: $targetTodoApps[index],
          }),
      );
    } catch (e) {
      console.error(ERROR_TYPE.CAN_NOT_LOAD);
    }
  }

  setState() {}

  render() {}
}
