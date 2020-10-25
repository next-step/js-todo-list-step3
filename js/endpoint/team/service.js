import { getTeam, postMember, postMemberTodoItem } from './controller.js';
import UseMiddleWare from '../../lib/UseMiddleWare.js';
import Router from '../../Router.js';
import { setter } from '../../store/team.js';

// validTeam 을 먼저 하는이유, step2 에서 여러 api (todo우선순위 수정, content 수정, 삭제 등) 에서 memberId 가 없을 경우, 에러 메세지의 내용이 살짝씩 달라서
// 에러 처리경우의 수를 많이 고려해 주어야 했음.
const validTeam = async(teamId) => {
  try {
    await getTeam({ teamId });
  } catch (error) {
    console.log(error);
    // TODO: 팀이 없을 경우, Home 으로 리디렉션
    await Router.push('');
  }
};

export const createTeamMember = async({ teamId, name }) => (
  await UseMiddleWare(
    () => validTeam(teamId),
    () => postMember({ teamId, name }),
  )
);

export const createMemberTodoItem = async({ teamId, memberId, contents }) => {
  const newTodo = await UseMiddleWare(
    () => validTeam(teamId),
    () => postMemberTodoItem({ teamId, memberId, contents }),
  );
  setter.addMemberTodoItem(teamId, memberId, newTodo);
};