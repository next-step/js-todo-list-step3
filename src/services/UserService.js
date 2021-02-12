import errorHandler from './errorHandler';
import hermes from './index';

const USER_QUERY = '/users/';
/**
 * @namespace UserService at your service!
 */
const UserService = {
  async fetchUsers() {
    return await errorHandler(hermes.get, USER_QUERY);
  },

  async fetchUser(id) {
    return await errorHandler(hermes.get, USER_QUERY, id);
  },

  async add(payload) {
    return await errorHandler(hermes.post, USER_QUERY, payload);
  },

  async delete(id) {
    return await errorHandler(hermes.delete, USER_QUERY, id);
  },
};

export default UserService;
