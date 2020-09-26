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
    selectTeam(context , payload){
        context.commit('selectTeam' , payload);
    },
    addUser(context, payload){
        context.commit('addUser' , payload);
    }

}