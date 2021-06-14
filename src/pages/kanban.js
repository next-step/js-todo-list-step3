import {
  addMemberData,
  addTodoItemData,
  deleteTodoItemData,
  getMemberData,
  getTeamData,
  toggleTodoItemData,
} from '../api.js';
import MemberList from '../components/MemberList.js';
import TeamName from '../components/TeamName.js';

export default class Kanban {
  constructor() {
    this.team = {};

    this.TeamName = new TeamName();

    this.MemberList = new MemberList({
      onAddMember: async () => {
        try {
          const name = prompt('추가할 멤버 이름을 입력해주세요.');
          if (!name) return;

          await addMemberData(this.team._id, { name });
          this.init();
        } catch (error) {
          console.error(error);
        }
      },
      onAddTodoItem: async (memberId, contents) => {
        try {
          await addTodoItemData(this.team._id, memberId, { contents });
          this.initMember(memberId);
        } catch (error) {
          console.error(error);
        }
      },
      onDeleteTodoItem: async (memberId, itemId) => {
        try {
          await deleteTodoItemData(this.team._id, memberId, itemId);
          this.initMember(memberId);
        } catch (error) {
          console.error(error);
        }
      },
      onToggleTodoItem: async (memberId, itemId) => {
        try {
          await toggleTodoItemData(this.team._id, memberId, itemId);
          this.initMember(memberId);
        } catch (error) {
          console.error(error);
        }
      },
    });

    this.init();
  }

  renderTeamName() {
    this.TeamName.render(this.team.name);
  }

  renderMemberList() {
    this.MemberList.render(this.team.members);
  }

  renderAll() {
    this.renderTeamName();
    this.renderMemberList();
  }

  async initMember(memberId) {
    const member = this.team.members.find(({ _id }) => _id === memberId);
    const newMember = await getMemberData(this.team._id, memberId);
    member.todoList = newMember.todoList;
    this.renderMemberList();
  }

  async init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    this.team = await getTeamData(params.id);
    this.renderAll();
  }
}

new Kanban();
