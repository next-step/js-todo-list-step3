/* @jsx createElement */
import { createElement } from 'react';
import { useSelector } from 'redux';
import TeamTitle from '@/components/TeamTitle';
import TeamContainer from '@/containers/TeamContainer';
import MemberListContainer from '@/containers/MemberListContainer';

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
