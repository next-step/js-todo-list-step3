const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/'

const Method = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
})

const HttpEndpoint = {
  teams: '/api/teams',
}

export { baseURL, Method, HttpEndpoint }
