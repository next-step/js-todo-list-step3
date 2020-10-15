import CreateElement from '../../lib/CreateElement.js';

const TeamCard = ({ team }) => {
  const { name, _id } = team;
  const dom = CreateElement(
    'div',
    {
      className: 'team-card-container',
      dataset: {
        index: _id,
      },
    },
  );

  const render = () => {
    dom.innerHTML =
      `<a href="/kanban.html" class="card">
        <div class="card-title">
          ${name}
        </div>
      </a>`;
  };
  render();

  console.log(dom)
  return dom;
};

export default TeamCard;

