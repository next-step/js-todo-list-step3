import apiTeam from './apiTeam.js';
import apiMember from './apiMember.js';

const rootApi = { ...apiTeam, ...apiMember };

export default rootApi;
