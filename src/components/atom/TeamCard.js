/*@jsx Reilly.createElement */
import Reilly from 'reilly';

function TeamCard({ team, onclick }) {
  return (
    <div class="team-card-container">
      <a class="card" onclick={onclick} data-team_id={team._id}>
        <div class="card-title">{team.name}</div>
      </a>
    </div>
  );
}

export default TeamCard;
