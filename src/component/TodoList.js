import template from "../util/template.js";

function TodoList({ target, todoList, setMemberTodoList }) {
	this.todoList = todoList;

	this.setState = (updatedTodoItems) => {
		this.todoList = updatedTodoItems;
		setMemberTodoList(updatedTodoItems);
		this.render(updatedTodoItems);
	};

	this.attachEvent = ({ onDeleteButton, onCompleted, onEditing, onEdit, onSettingPriority }) => {
		this.onDeleteButton = onDeleteButton;
		this.onCompleted = onCompleted;
		this.onEditing = onEditing;
		this.onEdit = onEdit;
		this.onSettingPriority = onSettingPriority;
	};

	const html = (itemModel) => {
		const li = template("li", {
			class: `todo-list-item ${itemModel.completed ? "completed" : ""} ${
				itemModel.editing ? "editing" : ""
			}`.trim(),
			onDblClick: this.onEditing.bind(null, itemModel.id)
		});

		const div = template("div", { class: "view" });

		const input = template(
			"input",
			itemModel.completed
				? {
						class: "toggle",
						type: "checkbox",
						checked: true,
						onChange: this.onCompleted.bind(null, itemModel.id)
				  }
				: {
						class: "toggle",
						type: "checkbox",
						onChange: this.onCompleted.bind(null, itemModel.id)
				  }
		);

		const label = template("label", { class: "label" });
		let priority;

		if (itemModel.priority === "NONE") {
			priority = template("select", {
				class: "chip select",
				onChange: this.onSettingPriority.bind(null, itemModel.id)
			});
			const options = [0, 1, 2].reduce((acc, cur, idx) => {
				let option;
				if (idx === 0) {
					option = template("option", { value: `${cur}`, selected: true });
					option.appendChild(document.createTextNode("순위"));
				} else {
					option = template("option", { value: `${cur}` });
					option.appendChild(document.createTextNode(`${cur}순위`));
				}

				acc.push(option);
				return acc;
			}, []);
			priority.append(...options);
		} else if (itemModel.priority === "FIRST") {
			priority = template("span", { class: "chip primary" });
			priority.appendChild(document.createTextNode("1순위"));
		} else {
			priority = template("span", { class: "chip secondary" });
			priority.appendChild(document.createTextNode("2순위"));
		}

		const priorityContainer = template("div", { class: "chip-container" });
		priorityContainer.append(priority);

		label.append(priorityContainer);
		label.append(document.createTextNode(itemModel.contents));

		const button = template("button", {
			class: "destroy",
			onClick: this.onDeleteButton.bind(null, itemModel.id)
		});

		const edit = template("input", {
			class: "edit",
			value: itemModel.contents,
			onKeyDown: this.onEdit.bind(null, itemModel.id)
		});

		div.append(input, label, button);
		li.append(div, edit);
		return li;
	};

	this.render = (items) => {
		target.innerHTML = "";
		console.log("todolist render", items);
		items.reduce((acc, cur) => {
			acc.append(html(cur));
			return acc;
		}, target);
	};
}

export default TodoList;
