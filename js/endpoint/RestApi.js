import HTTPMethod from '../constant/HTTPMethod.js';
import ENV from '../ENV.js';

const { baseURL } = ENV;

const httpRequest = async(uri, method, body = undefined, timeout = 5000) => {
  const config = { method };
  const url = baseURL + uri;

  if (body) {
    config.body = JSON.stringify(body);
    config.headers = { 'Content-Type': 'application/json' };
  }

  let id = -1;
  const race = await Promise.race([
                                    new Promise((resolve) => {
                                      id = window.setTimeout(() => resolve(), timeout);
                                    }),
                                    fetch(url, config),
                                  ]);
  if (race instanceof Response) {
    clearTimeout(id);
    const contents = race.json();
    if (race.status === 404) throw new Error('404');
    if (race.status === 500) throw new Error(contents.message);
    return contents;
  }
  throw new Error('timeout');
};

export const GET = (uri) => httpRequest(uri, HTTPMethod.GET);
export const POST = (uri, body) => httpRequest(uri, HTTPMethod.POST, body);
export const PUT = (uri, body) => httpRequest(uri, HTTPMethod.PUT, body);
export const PATCH = (uri, body) => httpRequest(uri, HTTPMethod.PATCH, body);
export const DELETE = (uri) => httpRequest(uri, HTTPMethod.DELETE);


