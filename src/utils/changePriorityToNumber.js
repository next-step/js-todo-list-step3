import Priority from '../constant/priority';

export const changePriorityToNumber = (priority) => {
  if (priority === Priority.NONE) return 99;
  if (priority === Priority.FIRST) return 1;
  if (priority === Priority.SECOND) return 2;
};
