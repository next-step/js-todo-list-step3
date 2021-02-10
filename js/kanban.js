import { MemberApp } from "/js/components/index.js";

const appEl = document.querySelector("#app");
const teamId = new URLSearchParams(location.search).get("team-id");
new MemberApp(appEl, teamId);
