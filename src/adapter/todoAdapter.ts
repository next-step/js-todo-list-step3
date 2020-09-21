import { RestClient } from "@/core";

export const todoAdapterURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';
export const todoAdapterClient: RestClient = new RestClient(todoAdapterURL);
