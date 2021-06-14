/* @jsx createElement */
import { createElement } from '../lib/React';
import TeamListItem from './TeamListItem';
import AddTeamBtn from './AddTeamBtn';

const TeamList = ({ teams, onSelect, onAddTeam }) => {
  return (
    <div className="team-list-container">
      {teams.map((team) => (
        <TeamListItem team={team} onSelect={onSelect} />
      ))}
      <AddTeamBtn onAddTeam={onAddTeam} />
    </div>
  );
};

export default TeamList;
