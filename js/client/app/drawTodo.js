export function drawTodo(
  userUL,
  { _id, contents, isCompleted, priority },
  ordered = false
) {
  /**
   * last parameter 'ordered' for ordered todo element draw if true. default is falst.
   */
  const todoLI = document.createElement("li");
  todoLI.className = "todo-list-item";
  if (isCompleted) {
    todoLI.classList.add("completed");
  }
  todoLI.id = _id;

  todoLI.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""} />
      <label class="label">
          <div class="chip-container">
          <select class="chip select ${
            priority === "FIRST"
              ? "primary"
              : priority === "SECOND"
              ? "secondary"
              : ""
          }">
              <option value="0" ${
                priority === "NONE" ? "selected" : ""
              }>순위</option>
              <option value="1" ${
                priority === "FIRST" ? "selected" : ""
              }>1순위</option>
              <option value="2" ${
                priority === "SECOND" ? "selected" : ""
              }>2순위</option>
          </select>
          </div>
          ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <div class="view loading-animation" style="display:none">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
    <input class="edit" value="${contents}" />`;

  if (!ordered) {
    insertNonePriorityTodo(userUL, todoLI);
    return;
  }
  // switch-case has no lexical scope. using constant in each case produces error.
  // make it block, or make it 'let'.
  // due to querySelector's query string referenceNode may references non-li element.
  // make sure it references its 'li' element.
  switch (priority) {
    case "NONE":
      insertNonePriorityTodo(userUL, todoLI);
      break;

    case "FIRST":
      insertFirstPriorityTodo(userUL, todoLI);
      break;

    case "SECOND":
      insertSecondPriorityTodo(userUL, todoLI);
      break;
  }
}

function insertNonePriorityTodo(ul, li) {
  ul.appendChild(li);
}

function insertFirstPriorityTodo(ul, li) {
  const referenceNodes = ul.querySelectorAll("li select.primary");
  if (referenceNodes.length === 0) {
    ul.insertBefore(li, ul.querySelector("li"));
  } else {
    const lastPrimaryLINode = referenceNodes
      .item(referenceNodes.length - 1)
      .closest("li");
    ul.insertBefore(li, lastPrimaryLINode.nextElementSibling);
  }
}

function insertSecondPriorityTodo(ul, li) {
  const referenceNodes = ul.querySelectorAll("li select.secondary");
  if (referenceNodes.length === 0) {
    const primaryNodes = ul.querySelectorAll("li select.primary");
    if (primaryNodes.length === 0) {
      ul.insertBefore(li, ul.querySelector("li"));
    } else {
      ul.insertBefore(
        li,
        primaryNodes.item(primaryNodes.length - 1).closest("li")
          .nextElementSibling
      );
    }
  } else {
    const lastSecondaryLINode = referenceNodes
      .item(referenceNodes.length - 1)
      .closest("li");
    ul.insertBefore(li, lastSecondaryLINode.nextElementSibling);
  }
}
