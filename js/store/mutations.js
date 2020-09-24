
export default {
    addTeam(state , payload){
        state.team.push(payload);
        return state;
    },
    getTeam(state, payload){
    },
    getTeamList(state , payload){
        state.team = payload;
        return state;
    },
    deleteTeam(state, payload){
    },
}