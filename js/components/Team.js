const $addTeamButton = document.querySelector("#add-team-button");
const $teamCardButton = document.querySelector(".team-card-container a");

$addTeamButton.addEventListener("click", () => {
  const result = prompt("팀 이름을 입력해주세요");
});

$teamCardButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState("hi", "hi", "/kanban.html");
  // history.go(0);
});
