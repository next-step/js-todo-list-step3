import Subject from "../core/Subject.js";
import {FILTER} from "../constants/constants.js"

export default class FilterState extends Subject{
    constructor() {
        super();
        this.filter = FILTER.ALL;
      }
    
      get() {
        return this.filter;
      }
    
      set(updateFilter) {
        this.filter = updateFilter;
        this.publish();
      }   
}