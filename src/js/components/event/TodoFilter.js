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
  const memberIndex = event.target.closest("ul").dataset.memberindex;

  removeSelectedClass(memberIndex);
  addSelectedClass(event.target);

  const clickedButton = event.target.getAttribute("href");

  const filter = {
    "#active": () => {
      this.memberListData[memberIndex].filter = "active";
      let filteredList = JSON.parse(JSON.stringify(this.memberListData));

      filteredList[memberIndex].todoList = this.memberListData[memberIndex].todoList.filter(
        (item) => {
          return !item.isCompleted;
        }
      );

      this.render(filteredList);
    },
    "#completed": () => {
      this.memberListData[memberIndex].filter = "completed";
      let filteredList = JSON.parse(JSON.stringify(this.memberListData));

      filteredList[memberIndex].todoList = this.memberListData[memberIndex].todoList.filter(
        (item) => {
          return item.isCompleted;
        }
      );
      this.render(filteredList);
    },
    "#all": () => {
      this.memberListData[memberIndex].filter = "all";
      let filteredList = JSON.parse(JSON.stringify(this.memberListData));

      filteredList[memberIndex].todoList = this.memberListData[memberIndex].todoList;
      this.render(filteredList);
    },
    "#priority": () => {
      this.memberListData[memberIndex].filter = "priority";
      let filteredList = JSON.parse(JSON.stringify(this.memberListData));

      filteredList[memberIndex].todoList.sort((a, b) => {
        if (a.priority === 0) return;
        return a.priority - b.priority;
      });
      this.render(filteredList);
    },
  };

  filter[clickedButton]();
}

export { filtering };
