/* @jsx createElement */
import { createElement } from '../lib/React';

const MemberTitle = ({ member }) => {
  return (
    <h2>
      <span>
        <strong>{member}</strong>'s Todo List
      </span>
    </h2>
  );
};

export default MemberTitle;
