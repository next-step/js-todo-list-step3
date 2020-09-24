export default {
    addTeam(context , payload){
        context.commit('addTeam' , payload);
    },
    getTeam(context, payload){
        context.commit('clearTeam' , payload);
    },
    getTeamList(context , payload){
        context.commit('getTeamList' , payload);
    },
    deleteTeam(context, payload){
        context.commit('deleteTeam' , payload);
    },

}