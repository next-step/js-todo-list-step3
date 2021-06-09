import { fetchRequest } from "../lib/fetchRequest.js";
import { API_URL, METHOD } from "../constants/config.js";
import { INFORM_MESSAGES, ERROR_MESSAGES } from "../constants/message.js";

import TodoTitle from "./TodoTitle.js";
import MemberList from "./MemberList.js";

class Team {
  constructor({ teamData }) {
    this.teamData = teamData;
    this.memberList = new MemberList({
      memberList: this.teamData.members,
      onAddMember: this.onAddMember.bind(this),
    });
    new TodoTitle({ titleName: this.teamData.name });
  }

  async onAddMember() {
    const memberName = prompt(INFORM_MESSAGES.ADD_MEMBER);
    if (!memberName) return;

    const { response, error } = await fetchRequest(
      API_URL.MEMBERS(this.teamData._id),
      METHOD.POST,
      {
        name: memberName,
      }
    );

    if (error) return alert(ERROR_MESSAGES.ADD_MEMBER);

    this.memberList.setState(response.members);
  }
}

export default Team;
