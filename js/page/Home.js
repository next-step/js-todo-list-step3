import { dispatch, getter } from '../store/team.js';
import TeamCard from '../components/team/TeamCard.js';
import AddTeam from '../components/team/AddTeam.js';
import CreateElement from '../lib/CreateElement.js';
import Router from '../Router.js';

const Home = (props) => {
  dispatch.teamList();

  const dom = CreateElement('ul', { className: 'team-list-container' });
  dom.addEventListener('click', async(event) => {
    event.preventDefault();
    const { target, target: { dataset } } = event;
    if (dataset.component !== 'card') return;

    const id = target.closest('li').dataset.key;

    await Router.push('kanban', { id });
  });

  const render = () => {
    const teamList = getter.teamList(render);
    const teamCards = teamList.map((team) => TeamCard({ team }));
    dom.innerHTML = '';
    dom.append(
      ...teamCards,
      AddTeam(),
    );
  };
  render();

  return dom;
};

export default Home;

