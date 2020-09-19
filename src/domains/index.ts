import {Component} from "@/core";

export type RequestQuery = Record<string, string>;

export type RequestBodyValue = string | boolean | number | null | undefined;

export type RequestBody = Record<string, RequestBodyValue | RequestBodyValue[] | Record<string, RequestBodyValue>>;

export interface Constructable<T> {
  new(...args: any): T;
}

export type ComponentConstructable = Constructable<Component<any>>;

export interface CommonEvent<T extends HTMLElement = HTMLElement> extends Omit<Event, 'target'> {
  target: T
}

export interface MouseEvent<T extends HTMLElement = HTMLElement> extends Omit<Event, 'target'> {
  target: T
}

export interface KeyboardEvent<T extends HTMLInputElement = HTMLInputElement> extends Omit<Event, 'target'|'key'> {
  target: T;
  key: string;
}

export type PickEvent<T> = Extract<CommonEvent | MouseEvent | KeyboardEvent, T>

export * from "./TodoTeam";
export * from "./TodoMember";
export * from "./TodoItem";