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
        console.log(payload, 'pay')
        const selectedTeam = state.team.filter((item) => payload === item._id)
        state.selectedTeam = selectedTeam[0];
        console.log(state.selectedTeam);
        return state;
    },
    addUser(state, payload) {

        console.log(state.selectedTeam, 'before');
        state.selectedTeam.members = [];
        console.log(state.selectedTeam.members , 'isEmpty');
        state.selectedTeam.members = payload.members;

        console.log(state.selectedTeam ,'after');

        console.log(state.team,'beforeTEam');
        const idx = state.team.findIndex((item) => payload === item._id)
        state.team.splice(idx, 1);
        state.team.push(payload);

        console.log(state.team,'afterisTeam');
        return state;
    }
}