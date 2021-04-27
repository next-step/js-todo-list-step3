import Component from "../libs/component.js";
import { $ } from "../utils/dom.js";
import { getState } from "../redux/functions.js";
// TODO : 유저 타이틀 붙여주고 ( props로 넘겨줌 )
// TODO : 유저 리스트에 따라서 투두 반복 (props로 넘겨줌 )

class KanbanMain extends Component {
  constructor() {
    super();
    this.render();
  }

  render() {
    const todoState = getState(this, "todo");
  }
}

export default KanbanMain;
