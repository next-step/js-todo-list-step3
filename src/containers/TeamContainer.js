/* @jsx createElement */
import { createElement } from '../lib/React';
import { useSelector } from '../lib/Redux';
import { store } from './../index';
import { getTeam } from '../modules/team/thunk';
import { getMembers } from '../modules/member/thunk';
import TeamList from '../components/TeamList';

const TeamContainer = () => {
  const { teams } = useSelector((state) => state.team);

  const onSelect = (teamId) => {
    store.dispatch(getTeam(teamId));
    store.dispatch(getMembers(teamId));
  };

  if (teams) return <TeamList teams={teams} onSelect={onSelect} />;
};

export default TeamContainer;
