import { HttpMethod } from "@/constants";

export class RestClient {

  constructor (private readonly baseURL: string) {}

  private request (uri: string, method: HttpMethod = HttpMethod.GET): Promise<any> {
    return fetch(`${this.baseURL}/${uri}`, { method })
            .then(response => response.json());
  }

  private requestWithBody (uri: string, method: HttpMethod, body: any): Promise<any> {
    const headers = { 'Content-Type': 'application/json' };
    const requestInit: RequestInit = { method, headers, body: JSON.stringify(body) };
    return fetch(`${this.baseURL}/${uri}`, requestInit).then(response => response.json());
  }

  public get (uri: string): Promise<any> {
    return this.request(uri);
  }

  public delete (uri: string) {
    return this.request(uri, HttpMethod.DELETE);
  }

  public post (uri: string, body: any) {
    return this.requestWithBody(uri, HttpMethod.POST, body);
  }

  public put (uri: string, body: any) {
    return this.requestWithBody(uri, HttpMethod.PUT, body);
  }

  public patch (uri: string, body: any) {
    return this.requestWithBody(uri, HttpMethod.PATCH, body);
  }


}