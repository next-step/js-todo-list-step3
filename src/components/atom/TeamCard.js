/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function TeamCard({ team, onSelect }) {
  return (
    <div className="team-card-container">
      <a className="card" onclick={onSelect} data-team_id={team._id}>
        <div className="card-title">{team.name}</div>
      </a>
    </div>
  );
}

export default TeamCard;
