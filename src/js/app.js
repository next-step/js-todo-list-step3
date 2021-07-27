import { teamAPI, memberAPI } from "./api/api.js";
import MemberState  from "./store/memberState.js";
import Observer from "./core/Observer.js";
import MemberTodoList from "./component/memberTodoList.js";
import { $,$$ } from "./util/util.js";

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
    this.render(this.getTemplate(initialData.members));
    console.log(initialData);
    this.makeMember(initialData.members);
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
          <ul class="todo-list" data-id="${member._id}">
          </ul>
        </section>
        <div class="count-container" data-id="${member._id}" >
        </div>
      </div>
    </li>`).join()}
    `
  }
  makeMember(members){
    members.map(member =>{ new   MemberTodoList()  })
    this.memberState.set(members);

  }
}

new App()
