/* @jsx createElement */
import { createElement } from './lib/React';
import { useSelector } from './lib/Redux';
import TeamTitle from './components/TeamTitle';
import TeamContainer from './containers/TeamContainer';
import MemberListContainer from './containers/MemberListContainer';

const App = () => {
  const { selectedTeam } = useSelector((state) => state.team);

  return (
    <fragment>
      <TeamTitle name={selectedTeam?.name} />
      {selectedTeam ? <MemberListContainer /> : <TeamContainer />}
    </fragment>
  );
};

export default App;
