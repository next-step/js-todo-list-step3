/* @jsx createElement */
import { createElement } from '../lib/React';
import { useSelector } from '../lib/Redux';
import { store } from './../index';
import { addTeam, getTeam } from '../modules/team/thunk';
import { getMembers } from '../modules/member/thunk';
import TeamList from '../components/TeamList';

const TeamContainer = () => {
  const { teams } = useSelector((state) => state.team);

  const onSelect = (teamId) => {
    store.dispatch(getTeam(teamId));
    store.dispatch(getMembers(teamId));
  };

  const onAddTeam = () => {
    const teamName = prompt('팀 이름을 입력해주세요.').trim();
    if (teamName) {
      store.dispatch(addTeam(teamName));
    }
  };

  if (teams)
    return <TeamList teams={teams} onSelect={onSelect} onAddTeam={onAddTeam} />;
};

export default TeamContainer;
