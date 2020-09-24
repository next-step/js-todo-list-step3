import PubSub from "../core/pubsub.js";

export default class Store{
    constructor(params) {
        let self = this;

        self.actions = {};
        self.mutations = {};
        self.state = {};

        self.status = 'resting';

        self.events = new PubSub();

        if(params.hasOwnProperty('actions')){
            self.actions = params.actions;
        }
        if(params.hasOwnProperty('mutations')){
            self.mutations = params.mutations;
        }

        self.state = new Proxy((params.state || {}) , {
            set: function(state, key , value){
                state[key] = value;
                console.log(`stateChange: ${key} : ${value}`);

                self.events.publish('stateChange' , self.state);
                if(self.status !== 'mutation'){
                    console.warn(`뮤테이션의 키를 세팅하지 않았습니다,. ${key}`);
                }

                self.status = 'resting';
                return true;
            }
        })
    }

    dispatch(actionKey , payload){
        let self = this;

        if(typeof self.actions[actionKey] !== 'function'){
            console.error(`Action "${actionKey} doesn't exist`);
            return false;
        }
        console.groupCollapsed(`ACTION : ${actionKey}`);
        self.status = 'action';

        self.actions[actionKey](self,payload);

        console.groupEnd();
        return true;
    }
    commit(mutationKey, payload) {
        let self = this;

        // Run a quick check to see if this mutation actually exists
        // before trying to run it
        if(typeof self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        // Let anything that's watching the status know that we're mutating state
        self.status = 'mutation';

        // Get a new version of the state by running the mutation and storing the result of it
        let newState = self.mutations[mutationKey](self.state, payload);

        // Merge the old and new together to create a new state and set it
        self.state = Object.assign(self.state, newState);

        return true;
    }

}