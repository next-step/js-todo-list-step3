import { $ } from "../../utils/dom.js";
import { SELECTORS } from "../../utils/constant.js";
import { teamTitleView, loadingView } from "../../utils/templates.js";

class TeamTitle {
  constructor(props) {
    this.props = props;
    this.container = $(SELECTORS.USER_TITLE);
    this.render();
  }

  render() {
    this.container.innerHTML = this.props.isLoading
      ? loadingView
      : teamTitleView(this.props.name);
  }
}

export default TeamTitle;
