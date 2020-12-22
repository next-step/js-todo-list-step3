import {
  addTeamMember,
  getTeamList,
  getTeamMembers,
  addTeam,
  deleteTeam,
  getTodoListInTeamMember,
  addTodoItemOfTeamMember,
  deleteTodoItemOfTeamMember,
  toggleTodoItemOfTeamMember,
  updateUserTodoContentsOfTeamMember,
  updateTodoPriorityOfTeamMember,
  deleteAllTodoListOfTeamMember,
} from './api.js';

const getId = async () => {
  const name = 'test1111';
  const result = await addTeam(name);
  return result._id;
};

const AfterdeleteTeam = async (teamId) => {
  await deleteTeam(teamId);
};
describe('API TEST', () => {
  it('getTeamList', async () => {
    const result = await getTeamList();
    console.log(result);
    expect(result.length).toBeGreaterThan(0);
  });

  it('getTeamMembers', async () => {
    const teamId = 'DPwVtTcOy';
    const result = await getTeamMembers(teamId);
    console.log(result);
    expect(result._id).toBe(teamId);
  });

  it('addTeamMember', async () => {
    const name = 'test11';
    const result = await addTeam(name);
    console.log(result);
    expect(result.name).toBe(name);
    await AfterdeleteTeam(result._id);
  });

  it('deleteTeamMember', async () => {
    const teamId = await getId();
    const result = await deleteTeam(teamId);
    console.log(result);
    expect(result).toMatchObject({});
  });

  it('addUser', async () => {
    const teamId = await getId();
    const result = await addTeamMember(teamId, 'test11');
    console.log(result);
    expect(result._id).toEqual(teamId);
    expect(result.members[0].name).toContain('test11');
    await AfterdeleteTeam(teamId);
  });

  it('getTodoListInTeam', async () => {
    const teamId = await getId();
    const res = await addTeamMember(teamId, 'test11');
    const memberId = res.members[0]._id;
    const result = await getTodoListInTeamMember(teamId, memberId);
    console.log(result);
    expect(result._id).toEqual(memberId);
    await AfterdeleteTeam(teamId);
  });

  it('addTodoContentOfTeamMember', async () => {
    const teamId = await getId();
    const res = await addTeamMember(teamId, 'test11');
    const memberId = res.members[0]._id;
    const contents = 'Test 입니다.';
    const result = await addTodoItemOfTeamMember(teamId, memberId, contents);
    console.log(result);
    expect(result.contents).toEqual(contents);
    await AfterdeleteTeam(teamId);
  });

  it('deleteTodoContentOfTeamMember', async () => {
    const teamId = await getId();
    const res1 = await addTeamMember(teamId, 'test11');
    const memberId = res1.members[0]._id;
    const contents = 'Test 입니다.';
    const res2 = await addTodoItemOfTeamMember(teamId, memberId, contents);
    const itemId = res2._id;
    const result = await deleteTodoItemOfTeamMember(teamId, memberId, itemId);
    expect(result).toMatchObject({});
    await AfterdeleteTeam(teamId);
  });

  it('toggleTodoItemOfTeamMember', async () => {
    const teamId = await getId();
    const res1 = await addTeamMember(teamId, 'test11');
    const memberId = res1.members[0]._id;
    const contents = 'Test 입니다.';
    const res2 = await addTodoItemOfTeamMember(teamId, memberId, contents);
    const itemId = res2._id;
    const result = await toggleTodoItemOfTeamMember(teamId, memberId, itemId);
    console.log(result);
    expect(result.isCompleted).toBeTruthy();
    await AfterdeleteTeam(teamId);
  });
  it('updateUserTodoContentsOfTeamMember', async () => {
    const teamId = await getId();
    const res1 = await addTeamMember(teamId, 'test11');
    const memberId = res1.members[0]._id;
    const contents1 = 'Test11 입니다.';
    const res2 = await addTodoItemOfTeamMember(teamId, memberId, contents1);
    const itemId = res2._id;
    const contents2 = 'Test222 입니다.';
    const result = await updateUserTodoContentsOfTeamMember(teamId, memberId, itemId, contents2);
    console.log(result);
    expect(result._id).toEqual(itemId);
    expect(result.contents).not.toEqual(contents1);
    expect(result.contents).toEqual(contents2);
    await AfterdeleteTeam(teamId);
  });

  it('updateTodoPriorityOfTeamMember', async () => {
    const teamId = await getId();
    const res1 = await addTeamMember(teamId, 'test11');
    const memberId = res1.members[0]._id;
    const contents1 = 'Test11 입니다.';
    const res2 = await addTodoItemOfTeamMember(teamId, memberId, contents1);
    const itemId = res2._id;
    const priority = 'FIRST';
    const result = await updateTodoPriorityOfTeamMember(teamId, memberId, itemId, priority);
    console.log(result);
    expect(result._id).toEqual(itemId);
    expect(result.priority).not.toEqual('NONE');
    expect(result.priority).toEqual(priority);
    await AfterdeleteTeam(teamId);
  });

  it('deleteAllTodoListOfTeamMember', async () => {
    const teamId = await getId();
    const res1 = await addTeamMember(teamId, 'test11');
    const memberId = res1.members[0]._id;
    const contents1 = 'Test11 입니다.';
    await addTodoItemOfTeamMember(teamId, memberId, contents1);
    const result = await deleteAllTodoListOfTeamMember(teamId, memberId);
    console.log(result);
    expect(result).toMatchObject({});
  });
});
