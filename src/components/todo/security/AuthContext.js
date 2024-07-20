import { createContext, useContext, useState } from 'react';
import { apiClient } from '../api/ApiClient';
import { executeAuthenticationService } from '../api/authentication';
// create context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export default function AuthContextProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [ username, setUsername ] = useState()

    const [token, setToken] = useState()

    // const login = (username,password) => {
    //     if(username==='teerenzo' && password==='dummy'){
    //         setIsAuthenticated(true)
    //         setUsername(username)
    //         return true;
    //     }

    //     return false;

    // }

    // async function login(username, password) {

    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )
    //     console.log(baToken)
    //     try {
        
    //   const response = await  executeAuthenticationService(baToken)

    //     setIsAuthenticated(false)

    //     if(response.status === 200){
    //         setIsAuthenticated(true)
    //         setUsername(username)
    //         setToken(baToken)

    //         apiClient.interceptors.request.use(
    //             (config) => {
    //                 console.log('intercepting and adding a token')
    //                 config.headers.Authorization = baToken
    //                 return config
    //             }
    //         )
    //         return true            
    //     } else {
    //         logout()
    //         return false
    //     }  
    // } catch (error) {
    //     console.log(error)
    //     logout()
    //     return false    
    // }      
    // }

    async function login(username, password) {

        try {
        
      const response = await  executeAuthenticationService(username, password)

        setIsAuthenticated(false)

        if(response.status === 200){
            const jwtToken = response.data.token;
            setIsAuthenticated(true)
            setUsername(username)
            setToken(jwtToken)

            apiClient.interceptors.request.use(
                (config) => {
                    console.log('intercepting and adding a token')
                    config.headers.Authorization = 'Bearer ' + jwtToken
                    return config
                }
            )
            return true            
        } else {
            logout()
            return false
        }  
    } catch (error) {
        console.log(error)
        logout()
        return false    
    }      
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    const values = {
        isAuthenticated,
        login,
        logout,
        username,
        token
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}