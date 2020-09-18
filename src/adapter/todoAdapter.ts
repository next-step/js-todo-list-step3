import { RestClient } from "../core";

export const todoAdapterURL = 'https://blackcoffee-todolist.df.r.appspot.com/api';
export const todoAdapterClient: RestClient = new RestClient(todoAdapterURL);