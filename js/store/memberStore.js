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
    return [...this.members];
  }

  setCurrentMember(currentMember) {
    this.currentMember = currentMember;
  }

  getCurrentMember() {
    return this.currentMember;
  }

  findMember(id) {
    return this.members.find(({ _id }) => _id === id);
  }
}

export const memberStore = new MemberStore();
