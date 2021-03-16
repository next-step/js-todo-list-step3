import { HTTP_METHOD } from "./method.js";

const request = (() => {
  const config = {
    baseURI: "",
  };

  const init = (conf) => {
    Object.assign(config, conf);
  };

  const getRequest = (uri) =>
    fetch(config.baseURI + uri).then((response) => response.json());

  const postRequest = (uri, data) =>
    fetch(config.baseURI + uri, HTTP_METHOD.POST(data)).then((response) =>
      response.json()
    );

  const putRequest = (uri, data) =>
    fetch(config.baseURI + uri, HTTP_METHOD.PUT(data)).then((response) =>
      response.json()
    );

  const deleteRequest = (uri) =>
    fetch(config.baseURI + uri, HTTP_METHOD.DELETE());

  return {
    init,
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
  };
})();

export default request;
