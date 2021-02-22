/*@jsx Reilly.createElement */
import Reilly from 'reilly';

import { TeamCard, AddTeamButton, Skeleton } from 'components';
import { store } from '../..';
import { useSelector } from '../../lib/reducs';
import {
  fetchTeamAsync,
  addTeamAsync,
  loadTeam,
} from '../../reducs/module/team';

function TeamList() {
  const { teams, isTeamsLoading, selectedTeam } = useSelector(
    state => state.team
  );

  const onSelectTeam = e => {
    const id = e.target.closest('a').dataset.team_id;

    const cachedSelectTeam = teams.filter(({ _id }) => _id === id)[0];

    if (cachedSelectTeam.length) store.dispatch(loadTeam(cachedSelectTeam));
    else store.dispatch(fetchTeamAsync(id));
  };

  const onAddTeam = () => {
    const teamName = prompt('name your new Team!');
    if (!teamName || teamName.length < 3) {
      alert('plz insert proper name. longer than 2 chracter');
      return;
    }
    store.dispatch(addTeamAsync(teamName));
  };

  if (isTeamsLoading || !teams) return <Skeleton />;
  return (
    <div className="team-list-container">
      {teams.map((team, i) => (
        <TeamCard key={i} team={team} onSelect={onSelectTeam} />
      ))}
      <AddTeamButton onclick={onAddTeam} />
    </div>
  );
}

export default TeamList;
