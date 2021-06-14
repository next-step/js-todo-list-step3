import Api from "../js/api/api.js";
import TeamList from "./components/TeamList.js";
import detail from "./detail.js";

export default function App () {
	this.detail = new detail();
	const parmas = new URLSearchParams(window.location.search);
	const pageType = parmas.get("page");

	if (!pageType) {
		const render = async () => setState(await Api.getFetch("/api/teams"));

		const setState = (teams) => this.teamList.setState(teams);

		this.teamList = new TeamList(render);

		// const init = () => render();
		render();
	}
	else if (pageType === "teamDetail") {
		this.detail.init();
	}

}