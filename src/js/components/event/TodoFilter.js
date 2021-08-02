import { $$ } from "../../lib/util.js";

const removeSelectedClass = (memberIndex) => {
  $$(".filters")
    [memberIndex].querySelectorAll("a")
    .forEach((element) => {
      element.classList.remove("selected");
    });
};

const addSelectedClass = (target) => {
  target.classList.add("selected");
};

function filtering(event) {
  if (event.target.tagName !== "A") return;
  const memberIndex = event.target.closest("ul").dataset.memberindex;

  removeSelectedClass(memberIndex);
  addSelectedClass(event.target);

  const clickedButton = event.target.getAttribute("href").replace("#", "");

  this.memberListData[memberIndex].filter = clickedButton;

  this.render(this.memberListData);
}

export { filtering };
