import {baseUrl, method} from "../constants/constants.js";
import {request, options} from "./api.js";



export const addTeamToMember =  (teamId, name) => {
    return request(`${baseUrl}/api/teams/${teamId}/members`, options(method.POST, {name}))
}

export const getTeamToMemberToTodoList =  (teamId, memberId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}`, options(method.GET))

}

export const addTeamToMemberToTodoItem =  (teamId, memberId, contents) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items`, options(method.POST, {contents}))
}

export const deleteTeamToMemberToTodoItem =  (teamId, memberId, itemId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, options(method.DELETE))
}

export const putTeamToMemberToTodoItemToToggle =  (teamId, memberId, itemId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`, options(method.PUT))
}

export const putTeamToMemberToTodoItemToContents =  (teamId, memberId, itemId, contents) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}`, options(method.PUT, {contents}))
}

export const putTeamToMemberToTodoItemToPriority =  (teamId, memberId, itemId, priority) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`, options(method.PUT, {priority}))
}

export const deleteTeamToMemberToTodoList =  (teamId, memberId) => {
    return request(`${baseUrl}/api/teams/${teamId}/members/${memberId}/items`, options(method.DELETE))
}