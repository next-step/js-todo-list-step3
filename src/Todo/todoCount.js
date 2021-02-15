import { template } from '../template.js';

export const todoCount = ($todoList, status) => {
  const countNum = countFilter($todoList, status);
  const $todoCount = $todoList.closest('.todoapp').querySelector('.todo-count');
  $todoCount.insertAdjacentHTML('afterbegin', template.count(countNum));
};

const countFilter = ($todoList, status) => {
  const countAll = $todoList.getElementsByClassName('todo-list-item').length;
  const countCompletedTodo = $todoList.getElementsByClassName('completed').length;

  if (status === 'all') {
    return countAll;
  } else if (status === 'active') {
    return countAll - countCompletedTodo;
  } else if (status === 'completed') {
    return countCompletedTodo;
  }
};

export const resetCount = (memberId) => {
  const arr = document.querySelectorAll('.todoapp-container');

  //todo.dataset.memberid == memberId
  //이 테스트를 통과한 todo list의 count 부분을 지우는겨
};
