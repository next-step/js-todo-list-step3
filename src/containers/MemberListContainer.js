/* @jsx createElement */
import { createElement } from '../lib/React';
import AddUserBtn from '../components/AddUserBtn';
import MemberContainer from './MemberContainer';
import { useSelector } from '../lib/Redux';

const MemberListContainer = () => {
  const { members } = useSelector((state) => state.member);

  return (
    <fragment>
      <ul className="todoapp-list-container flex-column-container">
        {members?.map((member) => (
          <MemberContainer member={member} />
        ))}
        <AddUserBtn />
      </ul>
    </fragment>
  );
};

export default MemberListContainer;
