import HttpMethod from "../constants/HttpMethod";

export const RestClient = class {

  constructor (private readonly baseURL: string) {}

  private request (uri: string, method = HttpMethod.GET): Promise<any> {
    return fetch(`${this.baseURL}/${uri}`, { method })
            .then(response => response.json());
  }

  private requestWithBody (uri: string, method: string, body?: BodyInit): Promise<any> {
    return fetch(`${this.baseURL}/${uri}`, {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());
  }

  public get (uri: string): Promise<any> {
    return this.request(uri);
  }

  public delete (uri: string) {
    return this.request(uri, HttpMethod.DELETE);
  }

  public post (uri: string, body?: BodyInit) {
    return this.requestWithBody(uri, HttpMethod.POST, body);
  }

  public put (uri: string, body?: BodyInit) {
    return this.requestWithBody(uri, HttpMethod.PUT, body);
  }

  public patch (uri: string, body?: BodyInit) {
    return this.requestWithBody(uri, HttpMethod.PATCH, body);
  }


}