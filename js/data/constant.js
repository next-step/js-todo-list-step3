

export const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";

export const NOOP = () => {};


export const FooterTab = {
    SELECTED:"selected",
    ALL:"all",
    ACTIVE:"active",
    COMPLETED:"completed",
    PRIORITY:"priority"
}

export const Priorities ={
    FIRST: "FIRST",
    SECOND: "SECOND",
    NONE: "NONE",
}
export const Priorities_num = {
    FIRST: 1,
    SECOND: 2,
    NONE: 0,
}

export const HttpMethod ={
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    DELETE : "DELETE",
}

export default { Priorities, FooterTab, HttpMethod ,NOOP, BASE_URL};


