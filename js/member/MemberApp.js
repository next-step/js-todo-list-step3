import MemberTitle from './MemberTitle.js';
import MemberList from './MemberList.js';
import MemberInput from './MemberInput.js';
import rootApi from '../api/rootApi.js';
import TodoApp from '../todo/TodoApp.js';
import { ERROR_TYPE_MESSAGE } from '../utils/constants.js';

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

    this.memberTitle = new MemberTitle({
      teamName: this.teamName,
      $targetTeamTitle,
    });

    this.memberList = new MemberList({
      teamId,
      $targetTodoAppListContainer,
    });

    this.memberInput = new MemberInput({
      teamId,
      $targetTodoAppListContainer,
      onAddMember: async (addMember) => {
        await rootApi.fetchAddMember(this.teamId, addMember);
        this.memberList.render();
        this.makeInstanceTodoApp();
      },
    });

    this.makeInstanceTodoApp();
  }

  async makeInstanceTodoApp() {
    await this.memberList.render();
    try {
      const { members } = await rootApi.fetchTeam(this.teamId);
      this.members = members;
      const $targetTodoAppAll = document.querySelectorAll('.todoapp');
      const $targetNewTodoAll = document.querySelectorAll('.new-todo');
      const $targetTodoListAll = document.querySelectorAll('.todo-list');
      const $targetCountContainerAll = document.querySelectorAll(
        '.count-container',
      );
      const $targetTodoCountAll = document.querySelectorAll('.todo-count');
      const $targetFilterAll = document.querySelectorAll('.filters');
      this.members.map((member, index) => {
        new TodoApp({
          data: member.todoList,
          teamId: this.teamId,
          memberId: member._id,
          $targetTodoApp: $targetTodoAppAll[index],
          $targetNewTodo: $targetNewTodoAll[index],
          $targetTodoList: $targetTodoListAll[index],
          $targetCountContainer: $targetCountContainerAll[index],
          $targetTodoCount: $targetTodoCountAll[index],
          $targetFilter: $targetFilterAll[index],
        });
      });
    } catch (e) {
      console.error(ERROR_TYPE_MESSAGE.CAN_NOT_LOAD);
    }
  }
}
