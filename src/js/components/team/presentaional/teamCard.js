export default {
  template: (team, index) => {
    return `
    <div class='team-card-container' data-index=${index}>
      <a href='/kanban.html' class='card'>
      <div class='card-delete'>
        &times;
      </div>
      <div class='card-title'>
      ${team.name}
      </div>
      </a>
    </div>`;
  },
};
