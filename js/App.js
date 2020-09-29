import Team from './Team.js';

function App() {
  this.$app = document.querySelector('#app');

  this.$app.innerHTML = `
    <h1 id="user-title" data-username="eastjun">
        <span><strong>Team</strong>'s Todo Lists</span>
    </h1>
    <div class="team-list-container"></div>
    `;

  new Team();
}

new App();
