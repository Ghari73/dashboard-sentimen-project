import React, {useState} from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";
import { fetchLogin } from "./api/restApi";
import { Eye, EyeOff } from "lucide-react";

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
            }
            
        }
    }
    
    return (
        <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-lg w-full h-100 bg-white rounded-xl shadow-lg p-8 content-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left font-[Roboto]">Log In into your BSI Account</h2>

                <form onSubmit={handleLogin2} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Username / Email</label>
                        <input 
                        type="email" 
                        className="font-[Roboto] w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1BB8B3] focus:border-[#1BB8B3] outline-none transition-all"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left font-[Roboto]">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="font-[Roboto] w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1BB8B3] focus:border-[#1BB8B3] outline-none transition-all pr-10"
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
        {/* 
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div> */}

                    <button type="submit" className="font-[Roboto] w-full h-12 bg-[#1BB8B3] hover:bg-[#70F2EE] text-white font-medium py-2.5 rounded-lg transition-colors">
                        Log In
                    </button>
                </form>

                {/* <div class="mt-6 text-center text-sm text-gray-600">
                Don't have an account? 
                <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
                </div> */}
            </div>
        </div>
        </>
    )
}

export default App