import subject from "../core/Subject.js";

export default class TeamState extends subject {
    constructor(){
        super();
        this.teamList = [];
    }
    get(){
        return this.teamList;
    } 
    set(updateTeam){
        this.teamList = updateTeam;
        this.publish();
    }
}