import { filter, loadTeamList } from './Team/Team.js';
import { $teamListContainer } from './dom.js';

const app = async () => {
  await loadTeamList();

  $teamListContainer.addEventListener('click', filter);
};

app();
