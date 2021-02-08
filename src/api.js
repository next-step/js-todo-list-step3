const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = {
    post: (data) => ({
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }),

    delete: () => ({
        method: 'DELETE'
    }),

    put: (data) => ({
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
};

const request = async (url, option={}) => {
    try {
        const response = await fetch(url, option);

        if(!response.ok) {
            throw new Error(response.status);
        }
        return await response.json();

    } catch (e) {
        console.log(e);
    }
}

// api 템플릿 완성하기
export const api = {
    addTeam: (teamName) => {
        return request(`${BASE_URL}/api/teams`, option.post(teamName));
    },

    getTeam: (teamId) => {
        return request(`${BASE_URL}/api/teams/:${teamId}`);
    },

    getTeamList: () => {
        return request(`${BASE_URL}/api/teams`);
    },

    removeTeam: () => {
        return request(`${BASE_URL}api/teams/:${teamId}`, option.delete());
    }
}