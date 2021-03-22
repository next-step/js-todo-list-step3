import TodoList from './TodoList.js';
import todoApi from '../apis/todoApi.js';
import TodoInput from './TodoInput.js';

export default function TodoApp($el, props) {

	const fetchTodoItems = async () => {

		this.setState({isLoading: true});
		const {todoList: todoItems = []} = await todoApi.getTodoItems({
			teamId: this.state.teamId,
			userId: this.state.user.userId,
		});
		this.setState({todoItems, isLoading: false});
	};

	const createTodoItem = async (contents) => {

		const addedTodoItem = await todoApi.createTodoItem({
			teamId: this.state.teamId,
			userId: this.state.user.userId,
			contents,
		});

		this.setState({
			todoItems: [...this.state.todoItems, addedTodoItem],
		});
	};

	const toggleTodoItem = async (todoItemId) => {

		const changedTodoItem = await todoApi.toggleTodoItem({
			teamId: this.state.teamId,
			userId: this.state.user.userId,
			todoItemId,
		});
		const changedTodoItemIndex = this.state.todoItems.findIndex(
			(todoItem) => todoItem._id === changedTodoItem._id,
		);

		this.state.todoItems.splice(changedTodoItemIndex, 1, changedTodoItem);
		this.setState({
			todoItems: this.state.todoItems,
		});
	};

	const deleteTodoItem = async (todoItemId) => {

		await todoApi.deleteTodoItem({
			teamId: this.state.teamId,
			userId: this.state.user.userId,
			todoItemId,
		});
		await fetchTodoItems();
	};

	const editTodoItemContents = async (todoItemId, contents) => {

		const editedTodoItem = await todoApi.editTodoItemContents({
			teamId: this.state.teamId,
			userId: this.state.user.userId,
			todoItemId,
			contents,
		});
		const editedTodoItemIndex = this.state.todoItems.findIndex(
			(todoItem) => todoItem._id === todoItemId,
		);

		this.state.todoItems.splice(editedTodoItemIndex, 1, editedTodoItem);
		this.setState({
			todoItem: this.state.todoItems,
		});
	};

	const editTodoItemPriority = async (todoItemId, priority) => {

		const editedTodoItem = await todoApi.editTodoItemPriority({
			teamId: this.state.teamId,
			userId: this.state.user.userId,
			todoItemId,
			priority,
		});
		const editedTodoItemIndex = this.state.todoItems.findIndex(
			(todoItem) => todoItem._id === todoItemId,
		);

		this.state.todoItems.splice(editedTodoItemIndex, 1, editedTodoItem);
		this.setState({
			todoItem: this.state.todoItems,
		});
	};

	this.setState = (nextState) => {

		this.state = {
			...this.state,
			...nextState,
		};

		const {todoItems, isLoading} = this.state;
		this.components.todoList.setState({todoItems, isLoading});

		render();
	};

	const render = () => {
		const {userName} = this.state.user || {userName: ''};

		this.$el.innerHTML = `
			<h2>
				<span><strong>${userName}</strong>'s Todo List</span>
			</h2>
			<div class="todoapp">
				<section>
					<div id="user-list"></div>
		        </section>
		        
		        <section class="todoapp">
					<div id="todo-input"></div>
					<div id="todo-list"></div> 
					<div class="count-container">
						<span class="todo-count">총 <strong>0</strong> 개</span>
						<ul class="filters">
							<li><a href="/#" class="all selected" >전체보기</a></li>
							<li><a href="#active" class="active">해야할 일</a></li>
							<li><a href="#completed" class="completed">완료한 일</a></li>
						</ul>
						<button class="clear-completed">모두 삭제</button>
					</div>
			    </section>			
			</div>
        `;

		this.components = {
			todoList: new TodoList(
				this.$el.querySelector('#todo-list'),
				{
					todoItems: this.state.todoItems,
					isLoading: this.state.isLoading,
				},
				{
					toggleTodoItem,
					deleteTodoItem,
					editTodoItemContents,
					editTodoItemPriority,
				},
			),

			todoInput: new TodoInput(
				this.$el.querySelector('#todo-input'),
				{},
				{
					createTodoItem,
				},
			),
		};
	};

	const init = () => {

		this.$el = $el;
		this.state = {
			teamId: props.teamId,
			user: props.user,
			todoItems: [],
			isLoading: true,
		};
		this.components = {};

		render();
		fetchTodoItems();
	};

	init();
}
