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
    },
    getMemberTodoList(context , payload){
        context.commit('getMemberTodoList' , payload);
    },
    addMemberTodoItem(context, payload){
        context.commit('addMemberTodoItem' , payload);
    },
    deleteMemberAllTodoList(context , payload){
        context.commit('deleteMemberAllTodoList' , payload);
    },
    deleteMemberTodoList(context , payload){
        context.commit('deleteMemberTodoList' , payload);
    },
    putMemberTodoItemContents(context , payload){
        context.commit('putMemberTodoItemContents' , payload);
    },
    putMemberTodoListPriority(context , payload){
        context.commit('putMemberTodoListPriority' , payload);
    },


}