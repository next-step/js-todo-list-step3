const TeamCard = ({ teamList }) => {
  return teamList?.map(({ name, _id }) => (
    `<div class="team-card-container" data-index="${_id}">
        <a href="/kanban.html" class="card">
          <div class="card-title">
            ${name}
          </div>
        </a>
    </div>`
  )).join('') || '';
};

export default TeamCard;

