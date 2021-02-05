import { createElement } from "../../utils/createElement.js";
import $router from "../../router/index.js";

const template = `
  <div>      
    <h1 id="user-title" data-username="eastjun">
      <span><strong>Team</strong>'s Todo Lists</span>
    </h1>
    <div class="team-list-container">
      <div class="team-card-container">
        <div class="card">
          <div class="card-title">Black Coffee team</div>
        </div>
      </div>
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    </div>
  </div>
`;

export default function Main() {
  const dom = createElement(template);
  const card = dom.querySelector(".card");

  const init = () => {
    card.addEventListener("click", onLinkToTeam);
  };

  const onLinkToTeam = () => {
    $router.go("/kanban");
  };

  init();

  return dom;
}
