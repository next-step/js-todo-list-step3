import STRINGS from '../constant/STRINGS.js';

export const validateName = async (name, caller) => {
  if (name.length > 1)
    return true;

  alert(STRINGS.nameValidator);
  caller(validateName);
};