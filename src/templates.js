export const teamTemplate = ({ _id, name }) => `
	<div class="team-card-container">
		<a id="${_id}" href="/kanban.html" class="card">
			<div class="card-title">${name}</div>
		</a>
	</div>
`;

export const addTeamButtonTemplate = `
	<div class="add-team-button-container">
		<button id="add-team-button" class="ripple">
			<span class="material-icons">add</span>
		</button>
	</div>
`;
