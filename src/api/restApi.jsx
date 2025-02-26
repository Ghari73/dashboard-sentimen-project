import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.22.129:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
})

const apiLogin = axios.create({
    baseURL: 'http://192.168.22.129:8080/api/auth/login',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
})

export const fetchLogin = async (postData) => {
    try {
        console.log("⏳ Attempting to login...");

        const response = await api.post('/auth/login', postData);
        const token = response.data.token;
        
        if (!token) {
            throw new Error("Login successful but no token received.");
        }

        localStorage.setItem('token', token); // Simpan token di localStorage
        console.log("✅ Login successful. Token saved:", token);
        
        alert('Login Successful');
        return response.data;
    } catch (error) {
        console.error("❌ Login failed:", error.message);
        alert('Login gagal: ' + error.message);
        throw new Error('Failed to login: ' + error.message);
    }
};

// Fungsi fetch score frequency dengan token
export const fetchScoreFrequency = async () => {
    try {
        console.log("⏳ Fetching score frequency data...");
        
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        const response = await api.get('/data/score-frequency', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("✅ Data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching score frequency:", error.message);
        throw new Error('Failed to fetch score frequency: ' + error.message);
    }
};

export const fetchAllSentiment = async () => {
    try {
        console.log("⏳ Fetching all sentiment data...");

        const token = localStorage.getItem('token'); // Ambil token
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        const response = await api.get('/data/all-sentiment', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("✅ Sentiment data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching sentiment data:", error.message);
        throw new Error('Failed to fetch sentiment data: ' + error.message);
    }
};

// Fungsi fetch all review
export const fetchAllReview = async () => {
    try {
        console.log("⏳ Fetching all review data...");

        const token = localStorage.getItem('token'); // Ambil token
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        const response = await api.get('/data/all-review', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("✅ Review data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching review data:", error.message);
        throw new Error('Failed to fetch review data: ' + error.message);
    }
};

export default api;