import subject from "../core/Subject.js";

export default class MemberState extends subject {
    constructor(){
        super();
        this.memberList = [];
    }
    get(){
        return this.memberList;
    } 
    set(newMember){
        this.memberList = newMember;
        this.publish();
    }
}