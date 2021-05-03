const memberInfo = [];

const getMemberInfo = () => memberInfo;
const saveMemberInfo = (memberId, memberName, todoList) => {
	memberInfo.push({ memberId, memberName, todoList });
};

export { getMemberInfo, saveMemberInfo };
