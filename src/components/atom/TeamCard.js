/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function TeamCard({ team, onSelect }) {
  return (
    <div class="team-card-container">
      <a class="card" onclick={onSelect} data-team_id={team._id}>
        <div class="card-title">{team.name}</div>
      </a>
    </div>
  );
}

export default TeamCard;
