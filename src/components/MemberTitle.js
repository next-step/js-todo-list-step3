/* @jsx createElement */
import { createElement } from 'react';

const MemberTitle = ({ name }) => {
  return (
    <h2>
      <span>
        <strong>{name}</strong>'s Todo List
      </span>
    </h2>
  );
};

export default MemberTitle;
