import {getQuery} from '../utils/urlUtils.js';
import teamApi from '../apis/teamApi.js';

export default function Kanban($el) {

	const fetchTeam = async () => {

		const {_id, name, members} = await teamApi.findTeam(this.state.teamId);
		this.setState({
			teamId: _id,
			teamName: name,
			members: members,
		});
	};

	const addUser = async (defaultName = '') => {

		const userName = prompt('새로운 팀원 이름을 입력해주세요', defaultName);
		if (!userName || userName.trim() === '') {
			return;
		}
		if (userName.length < 2) {
			alert('팀원의 이름은 최소 2글자 이상이어야 합니다');
			await addUser(userName);
			return;
		}

		await teamApi.saveUser({
			teamId: this.state.teamId,
			userName,
		});
		await fetchTeam();
	};

	const bindEvents = () => {

		this.$el.addEventListener('click', async event => {

			if (event.target.closest('[data-action="addUser"]')) {
				await addUser();
			}
		});
	};

	const render = () => {

		const {teamName} = this.state;

		this.$el.innerHTML = `
			<h1 id="team-title" data-teamname="${teamName}">
				<span><strong>${teamName}</strong>'s Todo List</span>
		    </h1>
			<ul class="todoapp-list-container flex-column-container">
				<li class="todoapp-container">
					<h2><span><strong>eastjun</strong>'s Todo List</span></h2>
					<div class="todoapp"></div>
				</li>
				<li class="add-user-button-container">
					<button id="add-user-button" class="ripple" data-action="addUser">
						<span class="material-icons">add</span>
					</button>
				</li>
			</ul>
		`;

		bindEvents();
	}

	this.setState = (nextState) => {

		this.state = {
			...this.state,
			...nextState,
		};

		render();
	}

	const init = () => {

		this.$el = $el;
		this.state = {
			teamId: getQuery('teamId'),
		}

		if (!this.state.teamId) {
			alert('teamId 가 잘못되었습니다.');
			document.location.href = './index.html';
		}

		fetchTeam();
	}

	init();
}
