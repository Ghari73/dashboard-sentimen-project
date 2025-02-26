import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('userToken')
    });

    const login2 = async (token) => {
        
        setUser({token});
        await localStorage.setItem('userToken', token)
        console.log("ini token ", localStorage.getItem('userToken'), "sama ini kocak ", isLoggedIn)
        // setIsLoggedIn(true)
    }

    const login = (username) => {
        if (username === 'admin@gmail.com'){
            localStorage.setItem('auth','true');
            setIsLoggedIn(true);
            console.log(isLoggedIn)
            return true;
        }
        return false;
    }

    const logout2 = async () => {
        console.log("masuk ga?")
        await localStorage.removeItem('userToken')
        setUser(null)
        // setIsLoggedIn(false)
    }

    const logout = () => {
        localStorage.setItem('auth','false')
        setIsLoggedIn(false);
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setIsLoggedIn(true);
            navigate('/dashboard');
        }
    }, [user]);

    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            setIsLoggedIn(false);
            navigate('/');
        }
    }, [user]);

    return (
        <AuthContext.Provider value= {{
            isLoggedIn, login, logout, user, login2, logout2}}>
           {children} 
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);