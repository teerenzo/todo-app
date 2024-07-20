import { createContext, useContext, useState } from 'react';
// create context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)


export default function AuthContextProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [ username, setUsername ] = useState()

    const login = (username,password) => {
        if(username==='teerenzo' && password==='dummy'){
            setIsAuthenticated(true)
            setUsername(username)
            return true;
        }

        return false;

    }

    const logout = () => {
        setIsAuthenticated(false)
    }

    const values = {
        isAuthenticated,
        login,
        logout,
        username
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}