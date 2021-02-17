/*@jsx Reilly.createElement */
import Reilly from 'reilly';
import { useSelector } from '../lib/reducs';
import { Interactions } from 'utils';
import { addMemberAsync } from '../reducs/module/user';
import { TodoApp, Skeleton, AddMemberButton } from 'components';
import { store } from '..';

function Main() {
  const { selectedTeam, isTeamLoading } = useSelector(state => state.team);
  const { _id: teamId } = selectedTeam;
  if (isTeamLoading) return <Skeleton />;

  const onAddMember = e => {
    const name = Interactions.askName();
    if (!name) return;
    store.dispatch(addMemberAsync(teamId, { name }));
  };

  return (
    <ul className="todoapp-list-container flex-column-container">
      {selectedTeam.members?.map(member => (
        <TodoApp key={member._id} member={member} />
      ))}
      <AddMemberButton onAddMember={onAddMember} />
    </ul>
  );
}

export default Main;
