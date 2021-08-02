/* @jsx createElement */
import { createElement } from 'react';

const TeamListItem = ({ team, onSelect }) => {
  return (
    <div className="team-card-container" onclick={() => onSelect(team._id)}>
      <dic className="card">
        <div className="card-title">{team.name}</div>
      </dic>
    </div>
  );
};

export default TeamListItem;
