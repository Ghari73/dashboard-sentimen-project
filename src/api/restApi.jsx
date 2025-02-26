import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.22.129:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000 
})

export const fetchLogin = async (postData) => {
    try{
        const response = await api.post('auth/login',postData)
        alert('Login Successful')
        return response.data
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            alert('Request Timeout: Server took too long to respond.');
        } else if (error.response) {
            if (error.response.status === 404) {
                alert('Username atau password salah.');
            } else if (error.response.status === 500) {
                alert('Server sedang mengalami gangguan. Coba lagi nanti.');
            } else {
                alert(`Error ${error.response.status}: ${error.response.data?.message || 'Terjadi kesalahan'}`);
            }
        } else {
            alert('Gagal login: ' + error.message);
        }

        console.error('Error Response:', error.response);
        throw new Error('Failed to login users: ' + error.message);
    }
}

export const fetchSentimentDistribution = async (token) => {
    if (!token) {
        console.error("⚠ Token tidak tersedia, silakan login ulang.");
        return null; // Jangan fetch jika token kosong
    }

    try {
        const response = await api.get("/data/sentiment-distribution", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sentiment data:", error);
        throw error;
    }
};

export const fetchScoreFrequency = async () => {
    try {
        console.log("⏳ Fetching score frequency data...");
        
        const token = localStorage.getItem('userToken'); // Ambil token dari localStorage
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

        const token = localStorage.getItem('userToken'); // Ambil token
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

        const token = localStorage.getItem('userToken'); // Ambil token
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