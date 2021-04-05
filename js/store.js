import Item from './entity/Item.js';
import Team from './entity/Team.js';
import Member from './entity/Member.js';
import { fetchData } from './util.js';
import { ITEM_EVENTS, MEMBER_EVENTS, TEAM_EVENTS } from './appEvents.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

function appEvent(eventName, payload) {
  return new CustomEvent(eventName, { detail: payload });
}

function teamStore(rootComponent) {
  const teamMap = new Map();

  function getTeamList() {
    return Array.from([...teamMap.values()]);
  }

  async function fetchTeamList() {
    const teams = await fetchData(BASE_URL + '/api/teams');
    teams
      .map((team) => {
        return new Team(team);
      })
      .reduce((map, team) => {
        map.set(team._id, team);
        return map;
      }, teamMap);

    rootComponent.dispatchEvent(appEvent(TEAM_EVENTS.RENDER, getTeamList()));
  }

  async function createTeam(name) {
    const team = await fetchData(BASE_URL + '/api/teams', 'POST', {
      name,
    }).then((team) => new Team(team));

    teamMap.set(team._id, team);

    rootComponent.dispatchEvent(appEvent(TEAM_EVENTS.RENDER, getTeamList()));
  }

  return {
    fetchTeamList,
    createTeam,
  };
}

function memberStore(rootComponent, teamId) {
  const currentTeamId = teamId;
  const memberMap = new Map();

  async function fetchTeam() {
    const team = await fetchData(`${BASE_URL}/api/teams/${currentTeamId}`);

    team.members
      .map((member) => new Member(member))
      .reduce((map, member) => {
        map.set(member._id, member);
        return map;
      }, memberMap);

    rootComponent.dispatchEvent(appEvent(MEMBER_EVENTS.RENDER, getMembers()));
    return team.name; //TODO yame
  }

  function getMembers() {
    return Array.from([...memberMap.values()]);
  }

  async function addMember(name) {
    const members = await fetchData(
      `${BASE_URL}/api/teams/${currentTeamId}/members`,
      'POST',
      { name }
    ).then((data) => data.members);

    members.forEach((member) => {
      if (memberMap.has(member._id)) {
        return;
      }

      memberMap.set(member._id, new Member(member));
    });

    rootComponent.dispatchEvent(appEvent(MEMBER_EVENTS.RENDER, getMembers()));
  }

  return {
    fetchTeam,
    getMembers,
    addMember,
  };
}

const filterStatusPredicate = {
  //TODO sync with todoStatus.js/filters
  all: () => true,
  completed: ({ isCompleted }) => isCompleted,
  active: ({ isCompleted }) => !isCompleted,
};

function itemStore(rootComponent, teamId, memberId, filter = 'all') {
  const currentTeamId = teamId;
  const currentMemberId = memberId;
  let currentFilter = filter;

  const itemMap = new Map();

  async function fetchItems() {
    const items = await fetchData(
      `${BASE_URL}/api/teams/${currentTeamId}/members/${currentMemberId}`
    ).then((data) => data.todoList);

    items
      .map((item) => new Item(item))
      .reduce((map, item) => {
        map.set(item._id, item);
        return map;
      }, itemMap);

    rootComponent.dispatchEvent(appEvent(ITEM_EVENTS.RENDER, getItems()));
  }

  function getItems() {
    return Array.from([...itemMap.values()]).filter(
      filterStatusPredicate[currentFilter]
    );
  }

  function setFilter(filter) {
    currentFilter = filter;
    rootComponent.dispatchEvent(appEvent(ITEM_EVENTS.RENDER, getItems()));
  }

  async function createItem(contents) {
    const item = await fetchData(
      `${BASE_URL}/api/teams/${currentTeamId}/members/${currentMemberId}/items`,
      'POST',
      { contents }
    );

    itemMap.set(item._id, item);

    rootComponent.dispatchEvent(appEvent(ITEM_EVENTS.RENDER, getItems()));
  }

  async function deleteItem(itemId) {
    await fetchData(
      `${BASE_URL}/api/teams/${currentTeamId}/members/${currentMemberId}/items/${itemId}`,
      'DELETE'
    );

    itemMap.delete(itemId);

    rootComponent.dispatchEvent(appEvent(ITEM_EVENTS.RENDER, getItems()));
  }

  async function toggleItem(itemId) {
    const item = await fetchData(
      `${BASE_URL}/api/teams/${currentTeamId}/members/${currentMemberId}/items/${itemId}/toggle`,
      'PUT'
    ).then((item) => new Item(item));

    itemMap.set(item._id, item);

    rootComponent.dispatchEvent(appEvent(ITEM_EVENTS.RENDER, getItems()));
  }

  async function updateItem({ _id, contents }) {
    const item = await fetchData(
      `${BASE_URL}/api/teams/${currentTeamId}/members/${currentMemberId}/items/${_id}`, //TODO _id vs itemId
      'PUT',
      { contents }
    ).then((item) => new Item(item));

    itemMap.set(item._id, item);
    rootComponent.dispatchEvent(appEvent(ITEM_EVENTS.RENDER, getItems()));
  }

  return {
    fetchItems,
    createItem,
    deleteItem,
    toggleItem,
    updateItem,
    setFilter,
  };
}

export { teamStore, memberStore, itemStore };
