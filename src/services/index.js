import Hermes from '../lib/hermes/Hermes';
import TeamService from './TeamService';

export const SERVER_URI = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

export default Hermes.create({
  baseURL: SERVER_URI,
  timeout: 2000,
});

export { TeamService };
