/* eslint-disable no-case-declarations */
import { todoDispatcher } from '../dispatcher/TodoDispatcher.js';
import { ACTION_TYPES } from '../action/Action.js';
import { DAO } from '../database/database.js';

const _getTeam = async (teamId) => {
  return await DAO.getTeam(teamId);
};
const _addMember = async (teamId, memberName) => {
  return await DAO.addMember(teamId, memberName);
};
const _copyState = (kanbanStoreState) => {
  const copy = {};
  copy.team = {
    _id: kanbanStoreState.team._id,
    name: kanbanStoreState.team.name,
    members: [...kanbanStoreState.team.members],
  };
  return copy;
};

const _state = {};

export class KanbanStore {
  constructor(teamId, kanbanApp) {
    this.teamId = teamId;
    this.kanbanApp = kanbanApp;
    this.dispatcherIndex = todoDispatcher.register(this.setState, this);
  }

  async init() {
    const team = await _getTeam(this.teamId);
    _state.team = team;

    const copiedState = _copyState(_state);
    this.kanbanApp.renderAll(copiedState);
  }

  getTeamId() {
    return _state.team._id;
  }
  getMembers() {
    return [..._state.team.members];
  }
  getLastAddedMember() {
    return _state.team.members[_state.team.members.length - 1];
  }

  async setState({ action }) {
    if (Object.keys(_state).length === 0) {
      new Error("Invalid state. May be the store isn't initiated");
    }
    const type = action?.type;
    if (!type) {
      new Error('Invalid Action.');
    }
    switch (type) {
      case ACTION_TYPES.GET_TEAMS:
        _state.team = await _getTeam(this.teamId);
        break;
      case ACTION_TYPES.ADD_MEMBER:
        const memberName = action?.memberName;
        await _addMember(this.teamId, memberName);
        _state.team = await _getTeam(this.teamId);
        const addedMember = this.getLastAddedMember();
        const copiedState = _copyState(_state);
        copiedState.team.members = [addedMember];
        this.kanbanApp.renderAll(copiedState);
        return true;
      default:
        return true;
    }
    const copiedState = _copyState(_state);
    this.kanbanApp.renderAll(copiedState);

    return true;
  }
}
