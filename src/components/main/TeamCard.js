import { createElement } from "../../utils/createElement.js";
import $router from "../../router/index.js";

const template = ({ name }) => `
  <div class="team-card-container">
    <div class="card">
      <div class="card-title">${name} team</div>
    </div>
  </div>
`;

export default function TeamCard({ team }) {
  const dom = createElement(template(team));

  const init = () => {
    dom.addEventListener("click", onLinkToTeam);
  };

  const onLinkToTeam = () => {
    $router.route("/kanban", { team });
  };

  init();

  return dom;
}
