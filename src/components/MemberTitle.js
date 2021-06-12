/* @jsx createElement */
import { createElement } from '../lib/React';

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
