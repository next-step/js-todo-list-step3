/* @jsx createElement */
import { createElement } from '../lib/React';
import MemberTitle from '../components/MemberTitle';
import TodoApp from './TodoApp';

const MemberContainer = ({ member }) => {
  return (
    <li className="todoapp-container">
      <MemberTitle name={member.name} />
      <TodoApp member={member} />
    </li>
  );
};

export default MemberContainer;
