/* @jsx createElement */
import { createElement } from '../lib/React';
import TeamList from '../components/TeamList';
import AddTeamBtn from '../components/AddTeamBtn';

const TeamContainer = () => {
  return (
    <fragment>
      <TeamList teams={teams} />
      <AddTeamBtn />
    </fragment>
  );
};

export default TeamContainer;
