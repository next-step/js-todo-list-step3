export const getItemId = (target) => {  return target.closest('li').id  };
export const currentTodoList = (memberId) => {return document.getElementById(`${memberId}`)};