/* @jsx createElement */
import { createElement } from 'react';

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
