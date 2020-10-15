import { dispatch, getter } from '../store/team.js';
import TeamCard from '../components/team/TeamCard.js';
import AddTeam from '../components/team/AddTeam.js';
import CreateElement from '../lib/CreateElement.js';


const Home = () => {
  dispatch.teamList();

  const dom = CreateElement('div', { className: 'team-list-container' });

  const render = () => {
    const teamList = getter.teamList(render);
    dom.innerHTML = '';
    const teamCards = teamList.map((team) => TeamCard({ team }));
    dom.append(
       ...teamCards,
      AddTeam()
    );
  };

  render();
  return dom;
};

export default Home;

