import api from '../../constant/api.js';
import { ALL, PRIORITY } from '../../constant/constant.js';
import { convertToFilter, convertToPriority, getIndex } from "../../utils/utils.js";

const getMemberInfo = (target, store) => {
  const { _id: teamId, members } = store.getState('currentTeam');
  const memberIndex = getIndex(target?.closest('.todoapp-container')?.dataset);
  const { _id: memberId, todoList } = memberIndex ? members[memberIndex] : { _id: null };
  const itemIndex = getIndex(target?.closest('.todo-list-item')?.dataset);
  const { _id: itemId } = itemIndex ? todoList[itemIndex] : { _id: null };
  return { teamId, memberId, itemId, memberIndex, itemIndex, members };
};

export const clearTodoItemHandler = async (target, store, dataLoader) => {
  const { teamId, memberId, itemId, memberIndex, itemIndex } = getMemberInfo(target, store, store);
  await dataLoader.deleteData(api.deleteTodoItemURL(teamId, memberId, itemId));
  store.dispatch('clearTodoItem', { memberIndex, itemIndex });
};

export const addMemberHandler = async (target, store, dataLoader) => {
  let name = prompt('새로운 팀원 이름을 입력해주세요');
  name && name.trim();
  if (!name || name.length < 2) return;

  const { teamId } = getMemberInfo(target, store);
  const body = { name };
  const res = await dataLoader.postData(api.addMemberURL(teamId), body);
  const { members } = res;
  const newMembers = members.map((member) => ({ ...member, filter: ALL }));
  res.members = newMembers;
  store.dispatch('addMember', res);
};

export const modifyTodoItemHandler = async (target, store, dataLoader) => {
  const { teamId, memberId, itemId, memberIndex, itemIndex } = getMemberInfo(target, store);
  const todoItem = await dataLoader.putData(api.toggleTodoItemURL(teamId, memberId, itemId), {});
  store.dispatch('modifyTodoItem', { memberIndex, itemIndex , todoItem });
};

export const clearTodoListHandler = async (target, store, dataLoader) => {
  const { teamId, memberId, memberIndex } = getMemberInfo(target, store);
  await dataLoader.deleteData(api.deleteTodoListURL(teamId, memberId));
  store.dispatch('clearTodoList', { memberIndex });
};

export const changeFilterHandler = (target, store) => {
  const { classList } = target;
  if (!classList.contains('priority') && classList.contains('selected')) return;

  const { memberIndex, members } = getMemberInfo(target, store);
  const copyMembers = [...members];
  if (classList.contains('priority') && classList.contains('selected')) {
    copyMembers[memberIndex].filter -= PRIORITY;
  } else if (classList.contains('priority')) {
    copyMembers[memberIndex].filter += PRIORITY;
  } else {
    const prev = copyMembers[memberIndex].filter >= PRIORITY ? PRIORITY : 0;
    copyMembers[memberIndex].filter = convertToFilter[classList[0]] + prev;
  }
  store.dispatch('changeFilter', { memberIndex, members: copyMembers })
};

export const addTodoItemHandler = async (target, store, dataLoader, contents) => {
  const { teamId, memberId, memberIndex } = getMemberInfo(target, store);
  const body = { contents };
  const todoItem = await dataLoader.postData(api.addTodoItemURL(teamId, memberId), body);
  store.dispatch('addTodoItem', { todoItem, memberIndex });
  target.value = '';
};

export const changeTodoItemContentsHandler = async (target, store, dataLoader, contents, key) => {
  const item = target.closest('.todo-list-item');
  if (key === 'Enter') {
    const { teamId, memberId, itemId, memberIndex, itemIndex } = getMemberInfo(target, store);
    const body = { contents };
    const todoItem = await dataLoader.putData(api.modifyTodoItemURL(teamId, memberId, itemId), body);
    store.dispatch('modifyTodoItem', { memberIndex, itemIndex , todoItem });
  }
  item.classList.remove('editing');
};

export const editTodoItemHandler = (target) => {
  if (target.className === 'label') {
    const item = target.closest('.todo-list-item');
    item.classList.add('editing');
  }
};

export const changeTodoItemPriorityHandler = async (target, store, dataLoader) => {
  const { teamId, memberId, itemId, memberIndex, itemIndex } = getMemberInfo(target, store);
  const body = { priority: convertToPriority[target.value] }
  const todoItem = await dataLoader.putData(api.changeTodoItemPriorityURL(teamId, memberId, itemId), body);
  store.dispatch('modifyTodoItem', { memberIndex, itemIndex , todoItem });
};