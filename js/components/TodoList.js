import {PRIORITY_TYPE} from '../consts/priorityType.js';

export default function TodoList($el, props,
                                 {toggleTodoItem, deleteTodoItem, editTodoItemContents, editTodoItemPriority}) {

	const bindEvents = () => {

		this.$el.addEventListener('click', (event) => {

			const {action} = event.target.dataset;

			if (action === 'toggle') {
				event.stopPropagation();
				const $todoItem = event.target.closest('li');
				const todoItemId = $todoItem.dataset.todoItemId;
				toggleTodoItem(todoItemId);
				return;
			}

			if (action === 'delete') {
				event.stopPropagation();
				const $todoItem = event.target.closest('li');
				const todoItemId = $todoItem.dataset.todoItemId;
				deleteTodoItem(todoItemId);
				return;
			}
		});

		this.$el.addEventListener('dblclick', (event) => {

			const {action} = event.target.dataset;

			if (action === 'onEditingContents') {
				event.stopPropagation();
				event.target.closest('li').classList.add('editing');
				return;
			}

			if (action === 'onEditingPriority') {
				event.stopPropagation();
				const $todoItem = event.target.closest('li');
				const todoItemId = $todoItem.dataset.todoItemId;
				this.state.todoItems.find(
					(todoItem) => todoItem._id === todoItemId,
				).onEditingPriority = true;

				this.setState({todoItems: this.state.todoItems});
			}
		});

		this.$el.addEventListener('keypress', (event) => {
			if (event.key !== 'Enter' && event.key !== 'Escape') {
				return;
			}

			const {action} = event.target.dataset;
			const $todoItem = event.target.closest('li');
			const todoItemId = $todoItem.dataset.todoItemId;

			if (action === 'edit') {
				if (event.key === 'Enter') {
					editTodoItemContents(todoItemId, event.target.value);
					return;
				}
				if (event.key === 'Escape') {
					event.target.value = this.state.todoItems.find(
						(todoItem) => todoItem._id === todoItemId,
					).contents;
					$todoItem.classList.remove('editing');
					return;
				}
			}
		});

		this.$el.addEventListener('change', (event) => {

			const {action} = event.target.dataset;

			if (action === 'changePriority') {
				const priority = event.target.value;
				const $todoItem = event.target.closest('li');
				const todoItemId = $todoItem.dataset.todoItemId;

				editTodoItemPriority(todoItemId, priority);
			}
		});
	};

	const makeTodoItemLoadingTemplate = function () {

		return `
			<li>
				<div class="view">
				<label class="label">
					<div class="animated-background">
					<div class="skel-mask-container">
						<div class="skel-mask"></div>
					</div>
					</div>
				</label>
				</div>
			</li>
		`;
	};

	const makeTodoItemTemplate = function (todoItem) {

		const {_id, contents, priority, isCompleted, onEditingPriority} = todoItem;
		return `
			<li class="${isCompleted ? 'completed' : ''}" data-todo-item-id="${_id}">
				<div class="view">
					<input class="toggle" type="checkbox" data-action="toggle" ${isCompleted ? 'checked' : ''} />
					<label class="label" data-action="onEditingContents">
						${makePriorityTemplate(priority, onEditingPriority)}
						${contents}
					</label>
					<button class="destroy" data-action="delete"></button>
				</div>
				<input class="edit" data-action="edit" value="${contents}" />
			</li>
		`;
	};

	const sortByPriority = (todoItemA, todoItemB) => {

		const {priority: priorityA} = todoItemA;
		const {priority: priorityB} = todoItemB;

		if (PRIORITY_TYPE[priorityA].order > PRIORITY_TYPE[priorityB].order) {
			return 1;
		}

		if (PRIORITY_TYPE[priorityA].order < PRIORITY_TYPE[priorityB].order) {
			return -1;
		}

		return 0;
	};

	const makePriorityTemplate = function (priority, onEditingPriority) {

		if (onEditingPriority || priority === 'NONE') {
			return `
				<select class="chip select" data-action="changePriority">
					<option value="NONE" ${priority === 'NONE' ? 'selected' : ''}>순위</option>
					<option value="FIRST" ${priority === 'FIRST' ? 'selected' : ''}>1순위</option>
					<option value="SECOND" ${priority === 'SECOND' ? 'selected' : ''}>2순위</option>
                </select> 
            `;
		}

		return `
			<span class="chip ${PRIORITY_TYPE[priority].className}" data-action="onEditingPriority">
				${PRIORITY_TYPE[priority].text}
			</span>
	    `;
	};

	this.setState = ({todoItems, isLoading}) => {

		this.state = {
			...this.state,
			todoItems,
			isLoading,
		};

		render();
	};

	const render = () => {

		const {todoItems, isLoading} = this.state;
		const sortedTodoItems = todoItems.sort(sortByPriority);

		this.$el.innerHTML = `
        <section class="main">
          <ul class="todo-list">
            ${isLoading ? makeTodoItemLoadingTemplate() : sortedTodoItems.map(makeTodoItemTemplate).join('')}
          </ul>
        </section>
        `;
	};

	const init = () => {

		this.$el = $el;
		this.state = {
			todoItems: props.todoItems,
			isLoading: props.isLoading,
		};

		render();
		bindEvents();
	};

	init();
}
