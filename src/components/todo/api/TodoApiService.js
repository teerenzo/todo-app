
// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }
import { apiClient } from './ApiClient'

export const retrieveHelloWorldBean 
    = () => apiClient.get('/hello-world-bean')

    export const retrieveAllTodosByUser
    = (username) => apiClient.get(`/users/${username}/todos`)

    export const deleteTodoApi = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)


    export const retrieveTodoApi = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)

    export const updateTodoApi = (username, id, todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)

    export const createTodoApi = (todo) => apiClient.post(`/users/${todo.username}/todos`, todo)