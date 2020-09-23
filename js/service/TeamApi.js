import {baseUrl ,method} from "../constants/constants.js";
import {request,options} from "./api.js";

export const addTeam = async name => {
    return request(`${baseUrl}/api/teams` , options(method.POST , name))
}

export const getTeam = teamId => {
    return request(`${baseUrl}/api/teams/${teamId}` , options(method.GET ))
}

export const getTeamList = () => {
    return request(`${baseUrl}/api/teams` , options(method.GET ))
}

export const deleteTeam = (teamId) => {
    return request(`${baseUrl}/api/teams/${teamId}` , options(method.DELETE ))
}
