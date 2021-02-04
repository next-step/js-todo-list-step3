const baseurl = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/teams';

const option = {
  post : (data) =>({
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  }),
  delete : () =>({
    method: "DELETE",
  }),
  put : (data) =>({
    method:"PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify(data),
  })
};

const request = async (url, option = {}) =>{
  try {
    const response = await fetch(`${baseurl}/${url}`, option);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


export const API = {
  //GET
  getTeams : () =>{
    return request(``);
  },
  getTeam : (teamId) =>{
    return request(`${teamId}`);
  },
  getMember : (teamId, memberId) =>{
    return request(`${teamId}/members/${memberId}`);
  },

  //POST
  postTeam : (teamName) =>{
    const dataset = {"name" : teamName };
    return request('',option.post(dataset));
  },
  postMember : (teamId, memberName) =>{
    const dataset = {"name" : memberName};
    return request(`${teamId}/members/`, option.post(dataset));
  },
  postItem : (teamId, memberId, item) =>{
    const dataset = {"contents":item};
    return request (`${teamId}/members/${memberId}/items`, option.post(dataset));
  },

  //PUT
  putToggle : (teamId, memberId, itemId) =>{
    return request (`${teamId}/members/${memberId}/items/${itemId}/toggle`, option.put());
  },
  putUpdate : (teamId, memberId, itemId, item) =>{
    const dataset = {"contents":item};
    return request (`${teamId}/members/${memberId}/items/${itemId}`, option.put(dataset))
  },
  putPriority : (teamId, memberId, itemId, priority) =>{
    const dataset = {"priority":priority};
    return request (`${teamId}/members/${memberId}/items/${itemId}/priority`, option.put(dataset))
  },


  //DELETE
  deleteTeam : (teamId) =>{
    return request(`${teamId}`, option.delete());
  },
  deleteItem : (teamId, memberId, itemId) =>{
    return request (`${teamId}/members/${memberId}/items/${itemId}`, option.delete());
  },
  deleteAllItem : (teamId, memberId) =>{
    return request (`${teamId}/members/${memberId}/items`, option.delete());
  },
}