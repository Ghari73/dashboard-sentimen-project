import React, {useState} from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";
import { fetchLogin } from "./api/restApi";
import { Eye, EyeOff } from "lucide-react";
import photo from './assets/pict.png';
import logo from './assets/logo.png';

function App() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("")
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const {login} = useAuth();
    const [loading, setLoading] = useState('')
    const [errorFetch, setErrorFetch] = useState(null);

    const handleLogin = (e) => {
        console.log("POI2")
        e.preventDefault();
        if (email === 'admin@gmail.com'){
            console.log("POI")
            login(email);
            navigate('/dashboard');
        } else{
            setError("Login Gagal")
        }
    }

    const {login2: setLoginState} = useAuth();
    
    const handleLogin2 = async (e) => {
        e.preventDefault()
        let postData = {
            "email": email,
            "password": pass
        }

        if (!email || !pass){
            alert('Validation Error: '+'email and password cannot be empty!')
        } else{
            console.log(postData)
            setLoading(true)
            try{
                const newPost = await fetchLogin(postData);
                setLoginState(newPost.token)
                
                // await setLoginState("7zxcj7ay87yashdasjdhkjbmnabuiqwe8812u38hajd")
            } catch (error){
                setErrorFetch(error)
                alert(errorFetch)
            } finally{
                setLoading(false)
            }
            
        }
    }
    
    return (
        <>
        <div className="flex h-screen">
            <div className="w-1/2 flex flex-col items-center justify-center bg-[#90C6BF] p-10">
                <img src={photo} className="w-3/5 h-auto object-cover" alt="Illustration" />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center bg-[#F4FAF9]">
                <div className="flex items-center mb-16">
                    <img src={logo} alt="Logo" className="h-30" />
                </div>

                <form onSubmit={handleLogin2} className="w-3/4 space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 font-[Roboto] text-left">
                        Log In into your BSI Account
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                            Username / Email
                        </label>
                        <input
                            type="email"
                            className="font-[Roboto] w-full h-12 px-4 py-2 border border-gray-700 rounded-lg 
                            focus:ring-2 focus:ring-[#1BB8B3] focus:border-[#1BB8B3] outline-none transition-all"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-[Roboto] text-left">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="font-[Roboto] w-full h-12 px-4 py-2 border border-gray-700 rounded-lg 
                            focus:ring-2 focus:ring-[#1BB8B3] focus:border-[#1BB8B3] outline-none transition-all pr-10"
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-6"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full h-12 text-white font-medium py-2.5 rounded-lg transition-colors
                            ${loading ? "bg-[#70F2EE] cursor-not-allowed" : "bg-[#1BB8B3] hover:bg-[#70F2EE]"}
                        `}
                        disabled={loading}
                    >
                        {/* {loading ? "Logging in..." : "Log In"} */}
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Log In"
                        )}
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default App