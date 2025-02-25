import React, {useState} from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";

function App() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

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
    
    return (
        <>
        <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div class="max-w-lg w-full h-100 bg-white rounded-xl shadow-lg p-8 content-center">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 text-left">Log In into your BSI Account</h2>
                
                <form onSubmit={handleLogin} class="space-y-4">
                    <div>
                        {/* <label class="block text-sm font-medium text-gray-700 mb-1">Email</label> */}
                        <input 
                        type="email" 
                        class="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Username / Email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        {/* <label class="block text-sm font-medium text-gray-700 mb-1">Password</label> */}
                        <input 
                        type="password" 
                        class="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all mb-5"
                        placeholder="Password"
                        onChange={(p) => setPass(p.target.value)}
                        />
                    </div>
        {/* 
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                        <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                    </div> */}

                    <button type="submit" class="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
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