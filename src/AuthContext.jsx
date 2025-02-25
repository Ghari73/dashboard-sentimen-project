import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('auth') === 'true'
    });

    const login = (username) => {
        if (username === 'admin@gmail.com'){
            localStorage.setItem('auth','true');
            setIsLoggedIn(true);
            console.log(isLoggedIn)
            return true;
        }
        return false;
    }

    const logout = () => {
        localStorage.setItem('auth','false')
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value= {{isLoggedIn, login, logout}}>
           {children} 
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);