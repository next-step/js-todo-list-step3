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

};
