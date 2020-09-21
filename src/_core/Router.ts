import {parseQuery} from "@/utils";
import {RequestQuery} from "@/domains";

export const Router = class {

  public $query: RequestQuery = {};

  constructor (
    private readonly callback: (uri: string) => void
  ) {
    window.onpopstate = () => this.load();
  }

  public load (): void {
    const uri: string = location.pathname.split('/').pop() || '';
    this.$query = parseQuery(location.search);
    this.callback(uri);
  }

  public push (uri: string): void {
    const query: RequestQuery = parseQuery(uri);
    this.$query = query;
    this.callback(uri);
    history.pushState(query, '', uri);
  }

}
