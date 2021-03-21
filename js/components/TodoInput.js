export default function TodoInput($el, props, {createTodoItem}) {

	const bindEvents = () => {

		this.$el.addEventListener('keypress', (event) => {

			if (event.key === 'Enter') {
				event.stopPropagation();
				createTodoItem(event.target.value);
				event.target.value = '';
			}
		});
	};

	const render = () => {

		this.$el.innerHTML = `
            <section class="input-container">
                <input
                    class="new-todo"
                    placeholder="할 일을 입력해주세요."
                    autofocus
                />
            </section> 
        `;

		bindEvents();
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
		this.state = {};

		this.setState();
	};

	init();
}
