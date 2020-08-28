import Kanban from "./components/Kanban/Kanban.js";
import { ID_SELECTOR, QUERY_STRING } from "./utils/constants.js";

const url = new URL(location.href);
const teamId = url.searchParams.get(QUERY_STRING.TEAM_ID);
new Kanban(document.getElementById(ID_SELECTOR.APP), teamId);
