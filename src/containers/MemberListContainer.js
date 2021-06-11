import AddUserBtn from '../components/AddUserBtn';
import MemberContainer from './MemberContainer';

const MemberListContainer = () => {
  return (
    <fragment>
      <ul className="todoapp-list-container flex-column-container">
        {members.map((member) => (
          <MemberContainer member={member} />
        ))}
      </ul>
      <AddUserBtn />
    </fragment>
  );
};

export default MemberListContainer;
