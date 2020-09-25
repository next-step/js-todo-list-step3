import { HttpClientAdapter } from "./HttpClientAdapter.js";

export const TeamHttpClient = class extends HttpClientAdapter {

    constructor() {
        super();
    }

    //1. 팀 추가
    addTeam(name) {
        return this.post(`/teams`, { name });
    }

    //2. 팀 불러오기
    loadTeam(teamId) {
        return this.get(`/teams/${teamId}`);
    }

    //3. 팀 리스트 불러오기
    loadTeams() {
        return this.get(`/teams`);
    }

    //4. 팀 삭제
    deleteTeam(teamId) {
        return this.delete(`/teams/${teamId}`);
    }

    //5.팀에 멤버 추가
    addTeamMember(teamId, name) {
        return this.post(`/teams/${teamId}/members`, { name });
    }

    //6. 팀원별 TodoList 불러오기
    loadTodoListByTeamMember(teamId, memberId) {
        return this.get(`/teams/${teamId}/members/${memberId}`);
    }

    //7. 팀원 TodoItem추가하기
    addTodoItemByTeamMember(teamId, memberId, contents) {
        return this.post(`/teams/${teamId}/members/${memberId}/items`, { contents });
    }

    //8. 팀원의 TodoItem 삭제하기
    deleteTodoItemByTeamMember(teamId, memberId, itemId) {
        return this.delete(`/teams/${teamId}/members/${memberId}/items/${itemId}`);
    }

    //9. 팀원의 TodoItem toggle하기
    toggleTodoItemByTeamMember(teamId, memberId, itemId) {
        return this.put(`/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`);
    }

    //10. 팀원의 TodoItem contents 수정하기
    modifyTodoItemByTeamMember(teamId, memberId, itemId, contents) {
        return this.put(`/teams/${teamId}/members/${memberId}/items/${itemId}`, { contents });
    }

    //11. 팀원의 TodoItem 우선순위 정하기
    modifyPriorityTodoItemByTeamMember(teamId, memberId, itemId, priority) {
        return this.put(`/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, { priority });
    }

    //12. 팀원의 TodoItem 전부 삭제
    delteAllTodoItemByTeamMember(teamId, memberId) {
        return this.delete(`/teams/${teamId}/members/${memberId}/items`);
    }

};
