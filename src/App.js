/* @jsx createElement */
import TeamTitle from './components/TeamTitle';
import TeamContainer from './containers/TeamContainer';
import { createElement } from './lib/React';

const App = () => {
  return (
    <fragment>
      <TeamTitle />
      <TeamContainer />
    </fragment>
  );
};

export default App;
