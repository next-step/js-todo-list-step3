import {FILTER_TYPE} from '../consts/filterType.js';

export default function TodoFooter($el, props, {clearTodoItems, changeFilter}) {

	const bindEvents = () => {

		this.$el.addEventListener('click', async event => {

			if (event.target.dataset.action === 'clearTodoItems') {
				await clearTodoItems();
			}

			if (event.target.dataset.filter) {
				await changeFilter(FILTER_TYPE[event.target.dataset.filter]);
			}
		});
	};

	const makeFilterListTemplate = () => {

		return Object.keys(FILTER_TYPE).map(key => {

			const filterType = FILTER_TYPE[key];
			return `
				<li><a href="#" data-filter="${key}" class="${filterType.value} ${filterType === this.state.filterType ? 'selected' : ''}">${filterType.text}</a></li>	
			`;
		}).join('');
	};

	const render = () => {

		this.$el.innerHTML = `
			<div class="count-container">
				<span class="todo-count">총 <strong>${this.state.todoItemsCount}</strong>개</span>
				<ul class="filters">
					${makeFilterListTemplate()}
				</ul>
				<button class="clear-completed" data-action="clearTodoItems">모두 삭제</button>
			</div>
		`;
	};

	this.setState = (nextState) => {

		this.state = {
			...this.state,
			...nextState,
		};

		render();
	};

	const init = () => {

		this.$el = $el;
		this.state = {
			todoItemsCount: props.todoItemsCount,
			filterType: props.filterType,
		};
		this.components = {};

		render();
		bindEvents();
	};

	init();
}
