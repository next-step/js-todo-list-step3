import { dispatch, getter } from '../store/team.js';
import TeamCard from '../components/team/TeamCard.js';
import AddTeam from '../components/team/AddTeam.js';
import CreateElement from '../lib/CreateElement.js';


const Home = () => {
  dispatch.teamList();

  const dom = CreateElement('div');

  const render = () => {
    const teamList = getter.teamList(render);
    dom.innerHTML = `
    <div class="team-list-container">
      ${TeamCard({ teamList })}
      ${AddTeam()}
    </div>
    `;
  };

  render();
  return dom;
};

export default Home;

