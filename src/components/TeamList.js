/* @jsx createElement */
import { createElement } from '../lib/React';
import TeamListItem from './TeamListItem';

const TeamList = ({ teams }) => {
  return (
    <div className="team-list-container">
      {teams.map((team) => (
        <TeamListItem team={team} />
      ))}
    </div>
  );
};

export default TeamList;
