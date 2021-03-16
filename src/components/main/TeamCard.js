import { createElement } from "../../utils/createElement.js";
import $router from "../../router/index.js";

const template = `
  <div class="team-card-container">
    <div class="card">
      <div class="card-title">team</div>
    </div>
  </div>
`;

export default function TeamCard({ team }) {
  const dom = createElement(template);
  const title = dom.querySelector(".card-title");

  const init = () => {
    render();
    dom.addEventListener("click", linkToTeam);
  };

  const render = () => {
    title.innerText = `${team.name} team`;
  };

  const linkToTeam = () => {
    $router.route("/kanban", { teamId: team._id });
  };

  init();

  return dom;
}
