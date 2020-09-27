import {priority} from "../constants/constants.js";

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
    getMemberTodoList(state, payload) {
        if (payload.todoList) {
            const idx = state.selectedTeam.members.findIndex((item) => payload._id === item._id)
            state.selectedTeam.members.splice(idx, 1);
            state.selectedTeam.members.push(payload);

        }
        return state
    },
    addMemberTodoItem(state, payload) {

        const idx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        if(state.selectedTeam.members[idx].todoList){
            state.selectedTeam.members[idx].todoList.push(payload.todoList);
            return state;
        }
        state.selectedTeam.members[idx].todoList = [payload.todoList];
        return state;
    },
    deleteMemberAllTodoList(state, payload) {
        const idx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        state.selectedTeam.members[idx].todoList = [];
        return state;
    },
    deleteMemberTodoList(state, payload) {
        const memberIdx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        const todoIdx = state.selectedTeam.members[memberIdx].todoList.findIndex((item) => payload.todoId === item._id)
        state.selectedTeam.members[memberIdx].todoList.splice(todoIdx, 1);
        return state;
    },
    putMemberTodoItemContents(state, payload) {
        const memberIdx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        const todoIdx = state.selectedTeam.members[memberIdx].todoList.findIndex((item) => payload.todoList._id === item._id)
        state.selectedTeam.members[memberIdx].todoList[todoIdx].contents = payload.todoList.contents;
        return state;
    },
    putMemberTodoListPriority(state, payload) {
        const memberIdx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        const todoIdx = state.selectedTeam.members[memberIdx].todoList.findIndex((item) => payload.todoList._id === item._id)
        state.selectedTeam.members[memberIdx].todoList[todoIdx].priority = payload.todoList.priority;
        return state;
    },
    putMemberTodoItemToggle(state, payload) {
        const memberIdx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        const todoIdx = state.selectedTeam.members[memberIdx].todoList.findIndex((item) => payload.todoList._id === item._id)
        state.selectedTeam.members[memberIdx].todoList[todoIdx].isCompleted = payload.todoList.isCompleted;
        return state;
    },
    sortMemberTodoItemPriority(state , payload){

        const memberIdx = state.selectedTeam.members.findIndex((item) => payload === item._id)

        console.log(state.selectedTeam.members[memberIdx].todoList , 'before');
        state.selectedTeam.members[memberIdx].todoList.map( todo =>{
            switch (todo.priority) {
                case priority.FIRST:
                    todo.priorityNumber = 3;
                    break;
                case priority.SECOND:
                    todo.priorityNumber = 2;
                    break;
                case priority.NONE:
                    todo.priorityNumber = 1;
                    break;

            }
        });
        state.selectedTeam.members[memberIdx].todoList.sort((a , b) => {
            const sortingField = "priorityNumber";
            return b[sortingField] - a[sortingField];
        })
        console.log(state.selectedTeam.members[memberIdx].todoList, 'after');
        return state;
    },
    getMemberTodoItemFilter(state, payload) {
        const memberIdx = state.selectedTeam.members.findIndex((item) => payload.memberId === item._id)
        state.selectedTeam.members[memberIdx].filterType = payload.filterType;
        console.log(state.selectedTeam.members[memberIdx]);
        return state;
    },
}