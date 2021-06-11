/* @jsx createElement */
import { createElement } from '../lib/React';

const TeamTitle = ({ TeamName = 'Team' }) => {
  return (
    <h1 id="user-title">
      <span>
        <strong>{TeamName}</strong>'s Todo Lists
      </span>
    </h1>
  );
};

export default TeamTitle;
