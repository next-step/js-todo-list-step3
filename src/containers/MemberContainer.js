/* @jsx createElement */
import { createElement } from '../lib/React';
import MemberTitle from '../components/MemberTitle';
import TodoApp from './TodoApp';

const MemberContainer = ({ member }) => {
  return (
    <li className="todoapp-container">
      <MemberTitle />
      <TodoApp />
    </li>
  );
};

export default MemberContainer;
