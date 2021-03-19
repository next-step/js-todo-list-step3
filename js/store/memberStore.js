'use strict';

class MemberStore {
  constructor() {
    this.members = [];
    this.currentMember = null;
  }

  setMembers(members) {
    this.members = members;
  }

  getMembers() {
    return this.members;
  }

  setCurrentMember(currentMember) {
    this.currentMember = currentMember;
  }

  setCurrentMember() {
    return this.currentMember;
  }
}

export const memberStore = new MemberStore();
