  export const common = {
    title : (name = 'Team') => `<h1 id="user-title" data-username="">
                                         <span><strong>${name}</strong>'s Todo Lists</span>
                                       </h1>`
  };
  export const teamBoard = {
    teamListContainer : `<div class="team-list-container"></div>`,
    teamCard : (teamName) => `<div class="team-card-container">
                               <a class="card">
                                <div class="card-title">
                                  ${teamName}
                                </div>
                               </a>
                              </div>`,
    addCard : () => ` <div class="add-team-button-container">
                         <button id="add-team-button" class="ripple">
                             <span class="material-icons">add</span>
                        </button>
                      </div>`
  };
  export const  kanbanBoard = {
    todoList : `<ul class="todoapp-list-container flex-column-container"></ul>`
  }

