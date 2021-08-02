import { teamAPI, memberAPI } from "./api/api.js";
import MemberState  from "./store/memberState.js";
import Observer from "./core/Observer.js";
import MemberTodoList from "./component/memberTodoList.js";
import { $,$$ } from "./util/util.js";
import { Title } from "./component/Title.js";

export default class App extends Observer{
  constructor(){ 
    super();
    this.memberState = new MemberState();
    this.render();
    this.init();
  }
  async init(){
    const teamID = location.search.split("=")[1];
    const teamTitle = $('#user-title');
    teamTitle.dataset.id = teamID;
    const initialData = await memberAPI.getMemberList(teamID);
    const teamName = initialData.name;

    this.render(this.getTemplate(initialData.members));
    this.makeMember(initialData.members);
    new Title(teamName);
    this.mounted();
  }
  render(template){
    const target = $(".todoapp-list-container");
    target.innerHTML = template;
  }
  getTemplate(members){
    return `
      ${members.map(member => `<li data-id="${member._id}" class="todoapp-container">
      <h2>
        <span><strong>${member.name}</strong>'s Todo List</span>
      </h2>
      <div data-id="${member._id}" class="todoapp">
        <section data-id=${member._id} class="input-container">
          <input class="new-todo" id="input${member._id}" placeholder="할 일을 입력해주세요." autofocus />
        </section>
        <section class="main">
          <ul class="todo-list" id="${member._id}">
          </ul>
        </section>
        <div class="count-container" id="filter${member._id}" >
        </div>
      </div>
    </li>`).join()}
    <li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
    </li>
    `
  }
  makeMember(members){
    members.map(member =>{ new MemberTodoList(member)});
    this.memberState.set(members)
  }
  mounted(){
    const memberAddBtn = $('#add-user-button');
    memberAddBtn.addEventListener('click', this.addNewMember.bind(this));
  }
  async addNewMember(){
    const memberName = prompt("추가 할 멤버 이름을 입력하세요");
    const teamId = $('#user-title').dataset.id;
    await memberAPI.postMemberAdd(teamId, {'name' : memberName});
    const memberList = await memberAPI.getMemberList(teamId);
    
    this.render(this.getTemplate(memberList.members));
    this.makeMember(memberList.members);
  }
}

new App()