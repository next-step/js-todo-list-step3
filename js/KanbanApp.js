import KanbanTeamTitle from './KanbanTeamTitle.js';
import KanbanMemberList from './kanbanMemberList.js';
import KanbanMemberInput from './KanbanMemberInput.js';
import rootApi from './api/apiHandler.js';

export default class KanbanApp {
  constructor({ teamName, teamId, $targetTeamTitle, $targetTodoAppListContainer }) {
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
      onClickAddMember: async (addMember) => {
        await rootApi.fetchAddMember(this.teamId, addMember)
        await this.kanbanMemberList.render()
      }
    })



    // const $todoApps = document.querySelector('.todoapp-list-container');
    this.$targetTodoAppListContainer.addEventListener('click', (e) => {
      const $target = e.target;
      const targetClassList = $target.classList;
      if (targetClassList.contains('chip')) {
        console.log($target)
        const $chipSelect = $target
          .closest('.chip-container')
          .querySelector('select');
        $target.classList.add('hidden');
        console.log($chipSelect)
        $chipSelect.classList.remove('hidden');
      }
    });

    // const $addUserButton = document.querySelector('#add-user-button');
    // $addUserButton.addEventListener('click', (e) => {
    //   console.log(e.target)
    //   const result = prompt('새로운 팀원 이름을 입력해주세요');
    // });
  }

  setState() {}

  render() {}
}
