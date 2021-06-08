export const ERROR_TYPES = {
  NOT_VALIDATE_TEAM_NAME: "NOT_VALIDATE_TEAM_NAME",
  NOT_VALIDATE_USER_NAME: "NOT_VALIDATE_USER_NAME",
};

export const ERROR_HANDLER = {
  NOT_VALIDATE_TEAM_NAME: () => {
    return alert("팀 이름은 2글자 이상이어야 합니다.");
  },
  NOT_VALIDATE_USER_NAME: () => alert("사용자 이름은 2글자 이상이어야 합니다."),
  DEFAULT: () => {
    alert("잠시후 다시 시도해주세요");
    return location.reload();
  },
};
