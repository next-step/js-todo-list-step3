import api from './api/api.js';
import { showError } from './util/showError.js';

class Store {
  async getTeamList() {
    const response = await api.getTeamList();
    if (response.isError) return showError(response.data);

    return response.data;
  }

  async getTeamMember(teamId) {
    const response = await api.getTeamMember(teamId);
    if (response.isError) return showError(response.data);

    return response.data.members;
  }
}

const store = new Store();

export default store;
