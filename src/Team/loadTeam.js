import { template } from '../etc/template.js';
import { render } from './team.js';
import { api } from '../etc/api.js';

export const loadTeamList = async () => {
  const teamList = await api.getTeamList();

  teamList.map((item) => {
    render(template.cardContainer(item.name, item._id));
  });

  render(template.addTeamButton());
};
