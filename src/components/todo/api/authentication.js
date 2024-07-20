import { apiClient } from "./ApiClient"

export const executeAuthenticationService
= (username,password) => apiClient.post(`/authenticate`,{
username,
password
})