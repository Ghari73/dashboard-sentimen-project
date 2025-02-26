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
        alert('Successfully logged out!')
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

// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("userToken"));
//   const [scoreData, setScoreData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // 🔥 Login ke API dan simpan token
//   const login = async (username, password) => {
//     try {
//       const response = await fetch("http://192.168.22.129:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const result = await response.json();
//       if (response.ok && result.token) {
//         localStorage.setItem("userToken", result.token);
//         setUser({ token: result.token });
//         setIsLoggedIn(true);
//         navigate("/dashboard");
//       } else {
//         alert("Login gagal: " + result.message);
//       }
//     } catch (error) {
//       console.error("Error saat login:", error);
//     }
//   };

//   // 🔥 Logout dan hapus token
//   const logout = () => {
//     localStorage.removeItem("userToken");
//     setUser(null);
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   // 🔥 Ambil data dari API setelah login
//   const fetchScoreData = async () => {
//     const token = localStorage.getItem("userToken");
//     if (!token) return;

//     try {
//       const response = await fetch("http://192.168.22.129:8080/api/data/score-frequency", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) throw new Error(`Error ${response.status}`);

//       const data = await response.json();
//       setScoreData(data);
//     } catch (error) {
//       console.error("Gagal fetch data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 Ambil data setelah login
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchScoreData();
//     }
//   }, [isLoggedIn]);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout, scoreData, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
