/*@jsx Reilly.createElement */
import Reilly from 'reilly';
import ReillyDOM from 'reillyDOM';
import { Title, Main, TeamList } from 'components';
import { store } from './index';
import { useSelector } from './lib/reducs';
import { fetchTeamsAsync } from './reducs/module/team';

class App extends Reilly.Component {
  constructor(props) {
    super(props);
    this.unsubscribe;
    this.fetchTeams();
  }

  async fetchTeams() {
    store.dispatch(fetchTeamsAsync());
  }

  render() {
    const { selectedTeam, editingId, error } = useSelector(state => state.team);

    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = store.subscribe(() => {
      ReillyDOM.render(this.render(), document.getElementById('root'));
    });

    if (editingId) {
      window.onbeforeunload = () => '작성 중인 메시지가 있습니다.';
    } else {
      window.onbeforeunload = null;
    }

    console.log('RENDERED!');

    if (error) {
      return (
        <div>
          <h1> {error.message} Error occured!</h1>
          <h2>
            <a href="/">plz reload</a>
          </h2>
        </div>
      );
    }

    return (
      <div id="app">
        <Title id="user-title" name={selectedTeam?.name} />
        {!selectedTeam ? <TeamList /> : <Main />}
      </div>
    );
  }
}

export default App;
