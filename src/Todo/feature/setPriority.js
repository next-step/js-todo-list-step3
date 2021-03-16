import { api } from '../../etc/api.js';
import { template } from '../../etc/template.js';
import { getItemId, getMemberId, teamId } from '../todo.js';

export const setPriority = async (target) => {
  const memberId = getMemberId(target);
  const itemId = getItemId(target);
  const contents = {
    priority: 'NONE',
  };
  const value = target.value;

  if (value === '0') {
    contents.priority = 'NONE';
  } else if (value === '1') {
    contents.priority = 'FIRST';
  } else if (value === '2') {
    contents.priority = 'SECOND';
  } else {
    resetSelector(target);
    return;
  }

  showChip(target, value);

  await api.setPriority(teamId, memberId, itemId, contents);
};

const resetSelector = (target) => {
  const $label = target.closest('.label');
  $label.querySelector('.chip-container').remove();
  $label.insertAdjacentHTML('afterbegin', template.chipContainer());
};

const showChip = (target, num) => {
  const $chipContainer = target.closest('.chip-container');
  const $chipSelector = $chipContainer.querySelector('select');
  const $primaryChip = $chipContainer.querySelector('.primary');
  const $secondaryChip = $chipContainer.querySelector('.secondary');

  const addHidden = ($domElement) => {
    $domElement.classList.add('hidden');
  };

  const removeHidden = ($domElement) => {
    $domElement.classList.remove('hidden');
  };

  if (num === '1') {
    addHidden($chipSelector);
    addHidden($secondaryChip);
    removeHidden($primaryChip);
  } else if (num === '2') {
    addHidden($chipSelector);
    addHidden($primaryChip);
    removeHidden($secondaryChip);
  } else if (num === '0') {
    addHidden($primaryChip);
    addHidden($secondaryChip);
    removeHidden($chipSelector);
  }
};
