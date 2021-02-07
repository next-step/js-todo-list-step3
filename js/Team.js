import Component from "./core/component.js";
const $addTeamButton = document.querySelector("#add-team-button");
$addTeamButton.addEventListener("click", () => {
  const result = prompt("팀 이름을 입력해주세요");
});

class Team extends Component {
  setup() {
    this.state = {};
  }
  template() {}
  mounted() {}
}

// new Team(document.getElementById("app"));
