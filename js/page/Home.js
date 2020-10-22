import { dispatch, getter, setter } from '../store/team.js';
import TeamCard from '../components/template/team/TeamCard.js';
import AddTeam from '../components/template/team/AddTeam.js';
import CreateElement from '../lib/CreateElement.js';
import Router from '../Router.js';

const Home = (props) => {
  dispatch.teamList();
  setter.teamName('team');

  const dom = CreateElement('ul', { className: 'team-list-container' });

  dom.addEventListener('click', async(event) => {
    event.preventDefault();

    const { target, target: { dataset } } = event;
    if (dataset.component !== 'card') return;

    const { key, name } = target.closest('li').dataset;
    const id = key;
    setter.teamName(name);
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

