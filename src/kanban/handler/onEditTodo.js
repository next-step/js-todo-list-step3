import { isContain } from '../../utils/validator.js';

export const onEditTodo = ({ target }) => {
  if (!isContain(target, 'label')) {
    return;
  }
  target.closest('li').classList.add('editing');
};
