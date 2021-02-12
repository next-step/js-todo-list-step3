/*@jsx Reilly.createElement */
import Reilly from 'reilly';

import { TeamCard, AddTeamButton, Skeleton } from 'components';
import { store } from '../..';
import { useSelector } from '../../lib/reducs';
import { fetchTeamAsync } from '../../reducs/module/team';

function TeamList() {
  const { teams, isTeamsLoading, team } = useSelector(state => state.team);

  const onSelectTeam = e => {
    store.dispatch(fetchTeamAsync(e.target.dataset.team_id));
  };

  if (isTeamsLoading) return <Skeleton />;
  return (
    <div class="team-list-container">
      {teams.map(team => (
        <TeamCard team={team} onclick={onSelectTeam} />
      ))}
      <AddTeamButton />
    </div>
  );
}

export default TeamList;
