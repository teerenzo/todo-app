import { useState } from 'react'
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate} from 'react-router-dom'
import './TodoApp.css'
import LoginComponent from './LoginComponent'
import LogoutComponent from './LogoutComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import  AuthContextProvider, { useAuth } from './security/AuthContext'
import TodoComponent from './TodoComponent'

export const AuthenticateRoute = ({children}) => {
    const authContext = useAuth();
    if(authContext.isAuthenticated){
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthContextProvider>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={ <LoginComponent /> } />
                    <Route path='/login' element={ <LoginComponent /> } />
                    <Route path='/welcome/:username' element={<AuthenticateRoute> <WelcomeComponent /> </AuthenticateRoute>} />
                    <Route path='/todos' element={<AuthenticateRoute> <ListTodosComponent /> </AuthenticateRoute> } />
                    <Route path='/logout' element={<LogoutComponent /> } />

                    <Route path='/todo/:id' element={<AuthenticateRoute> <TodoComponent /> </AuthenticateRoute> } />
                    
                    <Route path='*' element={<ErrorComponent /> } />

                </Routes>
                <FooterComponent />
            </BrowserRouter>
            </AuthContextProvider>
        </div>
    )
}





