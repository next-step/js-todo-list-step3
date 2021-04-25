export const template = {
	teamAddTemplate: (teamName) =>
		`
    <div class="team-card-container">
        <a href="/kanban.html" class="card">
            <div class="card-title">${teamName}</div>
        </a>
    </div>
    `,
};
