'use strict';

import { PRIORITY_CLASSLIST } from '../constant/constants.js';

const todoTitleTempalte = name => {
  return `
	<h2>
		<span><strong>${name}</strong>'s Todo List</span>
	</h2>
  `;
};

const todoInputTeamplate = () => {
  return `
  <section class="input-container">
	<input
		class="new-todo"
		placeholder="할 일을 입력해주세요."
		autofocus
	/>
	</section>
  `;
};

const priorityTemplate = priority => {
  return `
    <select class="chip select ${PRIORITY_CLASSLIST[priority]}" >
      <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
      <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
      <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
    </select>`;
};

export const todoCountTeamplate = number => {
  return `<span class="todo-count">총 <strong>${number}</strong> 개</span>`;
};

export const countContainerTeamplate = number => {
  return `
	<div class="count-container">
		${todoCountTeamplate(number)}
		<ul class="filters">
			<li>
				<a href="#all" class="filters__btn all selected">전체보기</a>
			</li>
			<li>
				<a href="#priority" class="filters__btn priority">우선 순위</a>
			</li>
			<li>
				<a href="#active" class="filters__btn active">해야할 일</a>
			</li>
			<li>
				<a href="#completed" class="filters__btn completed">완료한 일</a>
			</li>
		</ul>
		<button class="clear-completed">모두 삭제</button>
	</div>
	`;
};

export const todoAppTemplate = member => {
  return `
  <li data-id="${member._id}" class="todoapp-container">
	${todoTitleTempalte(member.name)}
	<div class="todoapp">
		${todoInputTeamplate()}
		<section class="main">
			<ul class="todo-list"></ul>
		</section>
		${countContainerTeamplate(member.todoList.length)}
	</div>
  </li>
  `;
};

export const todoItemTemplate = item => {
  return `
	<li data-id=${item._id} class="todo-list-item  ${
    item.isCompleted ? 'completed' : ''
  }">
	  <div class="view">
		<input class="toggle" type="checkbox" ${item.isCompleted ? 'checked' : ''}/>
		<label class="label">
			<div class="chip-container">
				${priorityTemplate(item.priority)}
			</div>
		  	${item.contents}
		</label>
		<button class="destroy"></button>
	  </div>
	  <input class="edit" value="${item.contents}" />
	  </li>`;
};

export const progressTemplate = () => {
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
  </li>`;
};

export const userAddButtonTemplate = () => {
  return `
  	<li class="add-user-button-container">
		<button id="add-user-button" class="ripple">
			<span class="material-icons">add</span>
		</button>
	</li>
	`;
};
