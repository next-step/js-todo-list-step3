import Api from "../js/api/api.js";
import TeamList from "./components/TeamList.js";

export default function App () {
	this.teamList = new TeamList();


	const setState = (teams) => {
		this.teamList.setState(teams);
	}

	const init = async () => {
		const teams = await Api.getFetch("/api/teams");

		console.log("teams", teams)

		setState(teams);
	}

	init();
}