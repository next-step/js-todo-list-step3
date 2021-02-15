import { addMember } from '../components/addMember.js';

export const handleClickTodoList = ({ target }, currentTeam) => {
  const event = {
    ripple: addMember,
    'material-icons': addMember,
  };

  return event[target.className] && event[target.className](currentTeam);
};
