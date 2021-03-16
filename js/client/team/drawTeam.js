const teamContainer = document.querySelector("div.team-list-container");
const addTeamButton = document.querySelector("div.add-team-button-container");

function checkValidTeam({ _id, name, members }) {
  return _id !== undefined && name !== undefined && members !== undefined;
}

export function drawTeam({ _id, name, members }) {
  if (!checkValidTeam({ _id, name, members })) return;

  const teamDiv = document.createElement("div");
  teamDiv.className = "team-card-container";
  teamDiv.id = _id;

  const template = `      
    <a href="/kanban.html#${_id}" class="card">
      <div class="card-title">
        ${name}
      </div>
    </a>`;
  teamDiv.innerHTML = template;

  teamContainer.insertBefore(teamDiv, addTeamButton);
}
