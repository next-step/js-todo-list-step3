import { UserTemplate } from "./user.js";

export default function UserList(app) {
  // const userList = document.querySelector("#user-list").querySelector(".users");

  this.render = (users) => {
    const template = users.map((user) => UserTemplate(user));
    userList.innerHTML = template.join("\n") + "<div>\n";
  };
}
