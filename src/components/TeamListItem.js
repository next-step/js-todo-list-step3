/* @jsx createElement */
import { createElement } from '../lib/React';

const TeamListItem = ({ team }) => {
  return (
    <div className="team-card-container">
      <a href="/kanban.html" className="card">
        <div className="card-title">Team A</div>
      </a>
    </div>
  );
};

export default TeamListItem;
