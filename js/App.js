import { responseMemberApi } from "./server/AppServer.js";

const $teamId = location.search.slice(1, location.search.length);
responseMemberApi($teamId);
