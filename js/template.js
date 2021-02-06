export const teamTemplate = {
    _id: "",
    name: "",
    members: [],
}

export const userTemplate = {
    _id: "",
    name: "",
    todoList: [],
}

export const todoItemTemplate = {
    _id: "",
    contents: "",
    priority: "",
    isCompleted: false,
}

export const teamTemplateHTML = team => `
    <div class="team-card-container">
        <a href="/kanban.html" class="card">
            <div class="card-title">
              ${team.name}
            </div>
        </a>
    </div>
`;