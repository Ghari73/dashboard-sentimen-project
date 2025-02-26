import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    
    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem("userToken");
        return storedToken ? { token: storedToken } : null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(!!user?.token);

    // const login2 = async (token) => {
        
    //     setUser({token});
    //     await localStorage.setItem('userToken', token)
    //     console.log("ini token ", localStorage.getItem('userToken'), "sama ini kocak ", isLoggedIn, "TOKENNNN: ")
    //     // setIsLoggedIn(true)
    // }
    const login2 = async (token) => {
        if (!token) return;

        // Simpan token di localStorage dulu
        localStorage.setItem("userToken", token);

        // Perbarui state user setelah token tersimpan
        setUser({ token });
        setIsLoggedIn(true);

        console.log("Login berhasil! Token:", token);
        navigate("/dashboard");
    };

    const login = (username) => {
        if (username === 'admin@gmail.com'){
            localStorage.setItem('auth','true');
            setIsLoggedIn(true);
            console.log(isLoggedIn)
            return true;
        }
        return false;
    }

    // const logout2 = async () => {
    //     console.log("masuk ga?")
    //     await localStorage.removeItem('userToken')
    //     setUser(null)
    //     alert('Successfully logged out!')
    //     // setIsLoggedIn(false)
    // }
    const logout2 = async () => {
        console.log("Logout...");

        // Hapus token dari localStorage
        localStorage.removeItem("userToken");

        // Set user ke null agar tidak bisa akses API
        setUser(null);
        setIsLoggedIn(false);

        navigate("/");
        alert("Successfully logged out!");
    };

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