import { $todoApps, getAllTodoList } from "./showTodoList.js";

const controlFilterButton = async ({ target }) => {
  if (target.nodeName !== "A") return;
  const currentButton = target.getAttribute("href").substr(11);

  if (currentButton !== "priority") await getAllTodoList();
  else chooseButton("priority");

  changeBox({ target });
};

const chooseButton = (button) => {
  const funcList = {
    all: viewAll,
    priority: viewPriority,
    active: viewTodo,
    completed: viewDone,
  };
  funcList[button]();
  reflectView();
};

const viewAll = () => {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => li.classList.add("selected"));
};

const viewPriority = () => {
  viewAll();
  const lists = document.querySelectorAll(".todoapp-container");
  const listItems = [];

  lists.forEach((list) => {
    listItems.push(list.querySelectorAll(".todo-list>li"));
  });

  const grade = {
    primary: 1,
    secondary: 0,
    undefined: -1,
  };

  const sortedArray = listItems.map((list) => {
    const listArray = [...list];
    listArray.sort((a, b) => {
      const aLabel = grade[a.querySelector("span.chip").classList[1]];
      const bLabel = grade[b.querySelector("span.chip").classList[1]];
      return bLabel - aLabel;
    });
    return listArray;
  });

  lists.forEach((list) => {
    const ul = list.querySelector(".todo-list");
    ul.innerHTML = "";
    const items = sortedArray.shift();
    items.forEach((item) => {
      ul.appendChild(item);
    });
  });
};

const viewTodo = () => {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => {
    if (li.querySelector(".toggle").hasAttribute("checked")) {
      li.classList.remove("selected");
    } else {
      li.classList.add("selected");
    }
  });
};

const viewDone = () => {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => {
    if (!li.querySelector(".toggle").hasAttribute("checked")) {
      li.classList.remove("selected");
    } else {
      li.classList.add("selected");
    }
  });
};

const changeBox = ({ target }) => {
  const anchors = document.querySelectorAll(".filters>li");
  const selectedButton = target.closest("li").getAttribute("class");
  anchors.forEach((item) => {
    const anchor = item.querySelector("a");
    if (item.classList.contains(selectedButton))
      anchor.classList.add("selected");
    else anchor.classList.remove("selected");
  });
};

const reflectView = () => {
  const list = document.querySelectorAll(".todo-list>li");
  list.forEach((li) => {
    if (li.classList.contains("selected")) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });

  renewItemCount();
};

const renewItemCount = () => {
  const lists = document.querySelectorAll(".todoapp-container");
  const listItems = [];
  lists.forEach((list) => {
    listItems.push(list.querySelectorAll("li.selected").length);
  });

  const itemCount = document.querySelectorAll(".todo-count>strong");
  itemCount.forEach((strong) => {
    strong.innerText = listItems.shift();
  });
};

export function initTodolistButton() {
  $todoApps.addEventListener("click", controlFilterButton);
}

export const changeByHash = (currenthash) => {
  chooseButton(currenthash);
};