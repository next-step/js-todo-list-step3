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
    dom.addEventListener("click", onLinkToTeam);
  };

  const render = () => {
    title.innerText = `${team.name} team`;
  };

  const onLinkToTeam = () => {
    $router.route("/kanban", { id: team._id });
  };

  init();

  return dom;
}
