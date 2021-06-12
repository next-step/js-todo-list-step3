/* @jsx createElement */
import { createElement } from '../lib/React';
import TeamListItem from './TeamListItem';
import AddTeamBtn from './AddTeamBtn';

const TeamList = ({ teams, onSelect }) => {
  return (
    <div className="team-list-container">
      {teams.map((team) => (
        <TeamListItem team={team} onSelect={onSelect} />
      ))}
      <AddTeamBtn />
    </div>
  );
};

export default TeamList;
