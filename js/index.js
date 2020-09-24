import store from './store/index.js'

import TeamTitle from "./components/Team/TeamTitle.js";
import {getTeamList} from "./service/TeamApi.js";


const init = async () => {
    const teamList = await getTeamList();
    store.dispatch('getTeamList', teamList);

    const teamInstance = new TeamTitle();
     teamInstance.render();
}
init();