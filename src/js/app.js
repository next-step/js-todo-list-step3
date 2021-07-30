import { teamAPI, memberAPI } from "./api/api.js";
import MemberState  from "./store/memberState.js";
import Observer from "./core/Observer.js";
import MemberTodoList from "./component/memberTodoList.js";
import { $,$$ } from "./util/util.js";
import Title from './component/Title.js';


export default class App extends Observer{
  constructor(){ 
    super();
    this.memberState = new MemberState;
    this.render();
    this.init();
  }
  async init(){
    const teamID = location.search.split("=")[1];
    const initialData = await memberAPI.getMemberList(teamID);
    const teamName = initialData.name;
    this.render(this.getTemplate(initialData.members));
    this.makeMember(initialData.members);
    new Title(teamName);

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
      <div class="todoapp">
        <section class="input-container">
          <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
        </section>
        <section class="main">
          <ul class="todo-list" id="todo-list-${member._id}">
          </ul>
        </section>
        <div class="count-container" id="count-container-${member._id}" >
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
    members.map(member =>{ new   MemberTodoList(member)  })
    this.memberState.set(members);
  }
}

new App()
