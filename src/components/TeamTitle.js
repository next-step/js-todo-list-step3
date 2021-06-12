/* @jsx createElement */
import { createElement } from '../lib/React';

const TeamTitle = ({ name = 'Team' }) => {
  return (
    <h1 id="user-title">
      <span>
        <strong>{name}</strong>'s Todo Lists
      </span>
    </h1>
  );
};

export default TeamTitle;
