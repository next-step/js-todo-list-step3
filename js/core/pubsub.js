export default class PubSub {
    constructor() {
        this.events = {};
    }


    subscribe(event, callback) {
        const {events} = this;

        events[event] = events[event] || [];

        return events[event].push(callback);
    }


    publish(event , data ={}){
        const {events} = this;
        if(!events.hasOwnProperty(event)){
            return [];
        }


        return events[event].map(callback => callback(data));
    }

}