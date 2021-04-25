import * as Ajax from "../util/ajaxUtil.js";
const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const APIs = {
  getTeams : () => `${BASE_URL}/api/teams/`,
  getTeam : (teamId) => `${BASE_URL}/api/teams/${teamId}`,
  getMembers : (teamId) => `${BASE_URL}/api/teams/${teamId}/members`,
  
  getTodoList : (teamId,memberId) =>  `${BASE_URL}/api/teams/${teamId}/members/${memberId}`,
  getItems : (teamId,memberId) =>  `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
  getItem : (teamId,memberId,itemId) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
  updateItem : (teamId,memberId,itemId,updateAction) => `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/${updateAction}`
}
export class RESTDataBase {
  static async getTeams() {
    const url = APIs.getTeams();
    return await Ajax.get(url,"Team List 로드 실패");
  }
  static async addTeam(teamName) {
    const url = APIs.getTeams();
    return await Ajax.post(url,{name:teamName},"Team Add 실패");
  }
  static async getTeam(teamId) {
    const url = APIs.getTeam(teamId);
    return await Ajax.get(url,"Team 정보 로드 실패");
  }
  static async addMember(teamId,memberName) {
    const url = APIs.getMembers(teamId);
    return await Ajax.post(url,{name:memberName},"Member Add 실패");
  }
  static async getMemberTodoList(teamId,memberId) {
    const url = APIs.getTodoList(teamId,memberId);
    return await Ajax.get(url,"Member TodoList 로드 실패");
  }
  static async addItem(teamId,memberId,data) {
    const url = APIs.getItems(teamId,memberId);
    return await Ajax.post(url,{'contents':data},"Add Item 실패");
  }
  static async deleteItem(teamId,memberId,itemId) {
    const url = APIs.getItem(teamId,memberId,itemId);
    return await Ajax.deleteRequest(url,"Delete Item 실패");
  }
  static async deleteItemAll(teamId,memberId) {
    const url = APIs.getItems(teamId,memberId);
    return await Ajax.deleteRequest(url,"Delete All Item 실패");
  }

  static async updateItemCompleteToggle(teamId,memberId,itemId) {
    const url = APIs.updateItem(teamId,memberId,itemId,'toggle');
    const options = {
      errMsg :"Update Item Complete Toggle 실패"
    }
    return await Ajax.put(url,options);
  }

  static async updateItem(teamId,memberId,itemId,data) {
    const url = APIs.getItem(teamId,memberId,itemId);
    const options = {
      'data' :{'contents':data},
      'errMsg' :"Update Item 실패"
    }
    return await Ajax.put(url,options);
  }
  

  static async updateItemPriority(teamId,memberId,itemId,priority) {
    const url = APIs.updateItem(teamId,memberId,itemId,'priority');
    const options = {
      'data' : {'priority':priority},
      'errMsg' :"Update Item Priority 실패"
    }
    return await Ajax.put(url,options);
  }
}
