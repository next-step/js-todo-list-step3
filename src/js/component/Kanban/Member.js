import { CLASSNAMES } from "../../utils/constant.js";
import { MemberTitleView } from "../../utils/templates.js";

class Member {
  constructor(props) {
    this.props = props;
    this.container = document.createElement("li");
    this.container.classList.add(CLASSNAMES.todo);
  }

  render() {
    const { _id, name, todoList } = this.props.member;
    this.container.dataset.id = _id;
    this.container.innerHTML += MemberTitleView(name);
    return this.container.outerHTML;
  }
}

export default Member;
