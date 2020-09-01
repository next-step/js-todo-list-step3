import { validateInstance } from "../../Common/utils.js";
import TodoApp from "./TodoApp.js";
import memberAPI from "../../Common/api/memberAPI.js";
import { isBoolean } from "../../Common/utils.js";
import Loader from "../../Common/Components/Loader.js";

function TodoAppList($target, team) {
  validateInstance(TodoAppList, this);
  this.$target = $target;
  this.state = {
    teamId: team._id,
    members: team.members,
    isLoading: false,
  };

  console.log(this.state.members);

  const api = new memberAPI(this.state.teamId);

  this.setState = (state) => {
    if (isBoolean(state?.isLoading)) {
      this.state.isLoading = state.isLoading;
    }

    if (state?.members) {
      this.state.members = state.members;
    }

    this.render();

    if (this.state.isLoading) {
      return;
    }

    this.initComponents();
  };

  this.initComponents = () => {
    console.log("members : ", this.state.members);
    this.todoApps = this.state.members.map((member) => {
      return new TodoApp(document.getElementById(member._id), {
        teamId: this.state.teamId,
        member,
      });
    });
    console.log(this.todoApps);
  };

  this.initEventListeners = () => {
    const onClickHandler = async (event) => {
      const $buttonElem = event.target.closest("button");
      if ($buttonElem?.classList.contains("ripple")) {
        const newMemberName = prompt("멤버 이름을 입력해주세요");
        if (!newMemberName) {
          return;
        }
        try {
          this.setState({ isLoading: true });
          const team = await api.addMember(newMemberName);
          this.state.members = team.members;
        } catch (error) {
          console.log(error);
        } finally {
          this.setState({ isLoading: false });
        }
      }
    };

    this.$target.addEventListener("click", onClickHandler);
  };

  this.render = () => {
    const membersHTML = this.state.members
      .map(({ _id }) => `<li class="todoapp-container" id="${_id}"></li>`)
      .join("");

    this.$target.innerHTML = this.state.isLoading
      ? Loader
      : `
      <ul class="todoapp-list-container flex-column-container">
        ${membersHTML}
        <li class="add-user-button-container">
          <button id="add-user-button" class="ripple">
            <span class="material-icons">add</span>
          </button>
        </li>
      </ul>
    `;
  };

  this.initEventListeners();
  this.render();
  this.initComponents();
}

export default TodoAppList;
