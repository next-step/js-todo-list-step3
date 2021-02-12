/*@jsx Reilly.createElement */
import Reilly from 'reilly';
import { useSelector } from '../lib/reducs';
import { TodoApp, Skeleton } from 'components';

function Main(props) {
  const { selectedTeam, isTeamLoading } = useSelector(state => state.team);

  return isTeamLoading ? (
    <Skeleton />
  ) : (
    <ul class="todoapp-list-container flex-column-container">
      {selectedTeam.members?.map(member => (
        <TodoApp member={member} />
      ))}
      <li class="add-user-button-container">
        <button id="add-user-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </li>
    </ul>
  );
}

export default Main;
