import { searchParam } from '../utils/misc.js'
import { api } from '../api/api.js'
import UserTitle from './UserTitle.js'
import AddUserButton from './AddUserButton.js'
import TodoApp from './TodoApp.js'
import TodoAppTemplate from './TodoAppTemplate.js'

export default function App() {
  const onAddUser = async (name) => {
    const { members } = await api.addMember(this.teamId, { name })
    this.setState(members)
  }

  const createTodoAppInstance = () => {
    this.$todoInput = document.querySelectorAll('.new-todo')
    this.$todoList = document.querySelectorAll('.todo-list')
    this.$todoCount = document.querySelectorAll('.todo-count > strong')
    this.$todoStatus = document.querySelectorAll('.filters')
    this.$todoDeleteAll = document.querySelectorAll('.clear-completed')

    this.members.map(
      (member, index) =>
        new TodoApp({
          teamId: this.teamId,
          memberId: member._id,
          username: member.name,
          todoList: member.todoList,
          $todoInput: this.$todoInput[index],
          $todoList: this.$todoList[index],
          $todoCount: this.$todoCount[index],
          $todoStatus: this.$todoStatus[index],
          $todoDeleteAll: this.$todoDeleteAll[index],
        })
    )
  }

  this.setState = async function (members) {
    this.members = members

    this.team = await api.getTeam(this.teamId)
    this.members = this.team.members

    this.todoAppTemplate.setState(this.members)
    createTodoAppInstance()
  }

  this.init = async function () {
    this.teamId = searchParam('teamId')
    this.teamName = searchParam('teamName')

    this.teams = await api.getTeamList()
    this.team = this.teams.find((team) => team.name === this.teamName)
    this.members = this.team.members.map((member) => {
      if (!member.hasOwnProperty('todoList')) {
        member.todoList = []
      }
      return member
    })

    this.$userTitle = document.querySelector('#user-title')
    this.$todoappListContainer = document.querySelector(
      '.todoapp-list-container'
    )

    try {
      this.userTitle = new UserTitle({
        teamName: this.teamName,
        $target: this.$userTitle,
      })

      this.todoAppTemplate = new TodoAppTemplate({
        members: this.members,
        $target: this.$todoappListContainer,
      })

      createTodoAppInstance()

      this.addUserButton = new AddUserButton({
        $target: this.$todoappListContainer,
        onAddUser,
      })
    } catch (err) {
      console.log(err)
    }
  }
  this.init()
}

new App()
