import { TeamApp } from './app/TeamApp.js';
import { TeamStore } from './store/TeamStore.js';

const teamApp = new TeamApp();
const teamStore = new TeamStore(teamApp);
teamStore.init();
