import {TodoMember} from "./TodoMember";

export interface TodoTeam {
  _id: string;
  name: string;
  members: TodoMember[]
}

export interface TodoTeamVO {
  name: string;
}
