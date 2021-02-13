import { loadTeam } from './loadTeam.js';

const Team = () => {
  loadTeam();
};

window.addEventListener('DOMContentLoaded', () => {
  Team();
});
