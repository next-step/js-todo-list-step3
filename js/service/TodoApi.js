import {baseUrl, method} from "../constants/constants.js";
import {request, options} from "./api.js";



export const addTeamToMember = async (teamId, name) => {
    return request(`${baseUrl}/api/teams/${teamId}/members`, options(method.POST, {name}))
}

export const getTeamToMemberToTodoList = async (teamId, memberId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}`, options(method.GET))

}

export const postTeamToMemberToTodoItem = async (teamId, memberId, contents) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items`, options(method.POST, {contents}))
}

export const deleteTeamToMemberToTodoItem = async (teamId, memberId, itemId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, options(method.DELETE))
}

export const putTeamToMemberToTodoItemToToggle = async (teamId, memberId, itemId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`, options(method.PUT))
}

export const putTeamToMemberToTodoItemToContents = async (teamId, memberId, itemId, contents) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, options(method.POST, {contents}))
}

export const putTeamToMemberToTodoItemToPriority = async (teamId, memberId, itemId, priority) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, options(method.PUT, {priority}))
}

export const deleteTeamToMemberToTodoList = async (teamId, memberId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items`, options(method.DELETE))
}