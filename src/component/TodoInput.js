import KEY_CODE from "../constants/KeyCode.js";

function TodoInput({ target, onAdd }) {
	const isValid = (event) => {
		if (event.keyCode === KEY_CODE.ENTER) {
			return true;
		}
	};

	const addTodoItem = (event) => {
		const $newTodoTarget = event.target;
		if (isValid(event, $newTodoTarget.value)) {
			if (event.target.value.length < 2) {
				alert("2글자 이상이어야 합니다.");
				return;
			}

			onAdd($newTodoTarget.value);
			$newTodoTarget.value = "";
		}
	};

	target.addEventListener("keydown", (event) => addTodoItem(event));
}

export default TodoInput;
