/* @jsx createElement */
import { createElement } from '../lib/React';
import AddUserBtn from '../components/AddUserBtn';
import MemberContainer from './MemberContainer';
import { useSelector } from '../lib/Redux';
import { addMember } from '../modules/member/thunk';
import { store } from '..';

const MemberListContainer = () => {
  const {
    team: { selectedTeam },
    member: { members },
  } = useSelector();

  const onAddMember = () => {
    const memberName = prompt('이름을 입력해주세요.')?.trim();
    if (memberName) {
      store.dispatch(addMember(selectedTeam._id, memberName));
    }
  };

  return (
    <fragment>
      <ul className="todoapp-list-container flex-column-container">
        {members?.map((member) => (
          <MemberContainer member={member} />
        ))}
        <AddUserBtn onAddMember={onAddMember} />
      </ul>
    </fragment>
  );
};

export default MemberListContainer;
