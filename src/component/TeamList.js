import template from "../util/template.js";

function TeamList({ target }) {
	this.setState = (updatedTeams) => {
		this.render(updatedTeams);
	};

	const html = (team) => {
		const container = template("div", { class: "team-card-container" });
		const link = template("a", { href: `/kanban.html?id=${team.id}`, id: team.id, class: "card" });
		const title = template("div", { class: "card-title", text: team.name });

		link.append(title);
		container.append(link);

		return container;
	};

	this.render = (teams) => {
		target.innerHTML = "";
		const doms = teams.map((team) => html(team));

		target.append(...doms);
	};
}

export default TeamList;
