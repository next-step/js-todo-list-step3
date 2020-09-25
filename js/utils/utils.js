/**
 * @author hansol
 * @date 2020-03-09
 * @desc String 문자열 html 코드를 html으로 인코딩해주는 함수
 */
export const toHtml = s => {
    let wrap = document.createElement("div");
    wrap.innerHTML = s;
    return wrap.firstChild;
};

export const getUrlParams = () => {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        (str, key, value) => params[key] = value);

    return params;
};
