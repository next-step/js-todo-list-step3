export default {
    addTeam(state, payload) {
        state.team.push(payload);
        return state;
    },
    getTeam(state, payload) {
    },
    getTeamList(state, payload) {
        state.team = payload;
        return state;
    },
    deleteTeam(state, payload) {
        const idx = state.team.findIndex((item) => payload === item._id)
        state.team.splice(idx, 1);
        return state;
    },
    selectTeam(state, payload) {
        const selectedTeam = state.team.filter((item) => payload === item._id)
        state.selectedTeam = selectedTeam[0];
        return state;
    },
    addUser(state, payload) {

        state.selectedTeam.members = [];
        state.selectedTeam.members = payload.members;
        const idx = state.team.findIndex((item) => payload === item._id)
        state.team.splice(idx, 1);
        state.team.push(payload);

        return state;
    },
    getMemberTodoList(state, payload){
        if(payload){
            return state

        }
        //console.log(payload , 'getMembers');
    }
}