import CreateElement from '../../lib/CreateElement.js';

const TeamCard = ({ team }) => {
  const { name, _id } = team;
  const dom = CreateElement(
    'li',
    {
      className: 'team-card-container',
      dataset: {
        component: 'card-container',
        key: _id,
        name
      },
    },
  );

  const render = () => {
    dom.innerHTML = `
       <a href="/#" class="card" data-component="card">
        <div class="card-title">
          ${name}
        </div>
      </a>
    `;
  };
  render();

  return dom;
};

export default TeamCard;

