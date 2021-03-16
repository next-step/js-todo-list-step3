const FILTERS = {
  ALL: {
    state: "all",
    text: "전체보기",
  },
  PRIORITY: {
    state: "priority",
    text: "우선순위",
  },
  ACTIVE: {
    state: "active",
    text: "해야할 일",
  },
  COMPLETED: {
    state: "completed",
    text: "완료된 일",
  },
};

const PRIORITY = {
  NONE: {
    seq: 0,
    value: "NONE",
    className: "",
    text: "",
  },
  FIRST: {
    seq: 1,
    value: "FIRST",
    className: "primary",
    text: "1순위",
  },
  SECOND: {
    seq: 2,
    value: "SECOND",
    className: "secondary",
    text: "2순위",
  },
};

export { FILTERS, PRIORITY };
