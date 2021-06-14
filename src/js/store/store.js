import PubSub from '../lib/pubSub.js';

export default class Store {
  constructor(params) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';
    this.events = new PubSub();

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }
    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }
    this.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value;
        console.log(`stateChange: ${key}: ${value}`);
        this.events.publish('stateChange', this.state);
        if (this.status !== 'mutation') {
          console.warn(`you should use a mutation to set ${key}`);
        }
        this.status = 'resting';
        return true;
      },
      get: (state, key) => {
        if (!state.hasOwnProperty(key)) {
          return [];
        }
        return state[key];
      }
    });
  }

  dispatch = (actionKey, payload) => {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action ${actionKey} doesn't exist`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);
    this.status = 'actions';
    this.actions[actionKey](this, payload);
    console.groupEnd();
    return true;
  }
  commit = (mutationKey, payload) => {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.error(`Mutation ${mutationKey} doesn't exist`);
      return false;
    }
    this.status = 'mutation';
    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
    return true;
  }
  getState = (key) => {
    switch(key) {
      case 'teams':
        return this.state[key];
      case 'currentTeam':
        const { teamIndex } = this.state;
        return this.state['teams'][teamIndex];
      default:
        return [];
    }
  }
}
