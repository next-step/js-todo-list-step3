const memberInfo = [];

const getMemberInfo = () => memberInfo;
const saveMemberInfo = (memberId, memberName, todoList) => {
	memberInfo.push({ memberId, memberName, todoList });
};
const clearMebmerInfo = () =>
	memberInfo.map((member) => (member.todoList.length = 0));

export { getMemberInfo, saveMemberInfo, clearMebmerInfo };
