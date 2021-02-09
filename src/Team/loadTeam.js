import { template } from '../template.js';
import { render } from './Team.js';
import { api } from '../api.js';

export const loadTeamList = async () => {
  //render(template.cardContainer('test', '0'));

  const teamList = await api.getTeamList();

  teamList.map((item) => {
    render(template.cardContainer(item.name, item._id));
  });

  render(template.addButton());
};
