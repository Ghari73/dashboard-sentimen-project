import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.22.129:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000 
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

// Fungsi fetch score frequency dengan token
export const fetchScoreFrequency = async (fromDate = "", toDate = "") => {
    try {
        console.log("⏳ Fetching score frequency data...", { fromDate, toDate });

        const token = localStorage.getItem('userToken'); // Ambil token dari localStorage
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        // Bangun endpoint dengan query parameter jika tanggal tersedia
        let endpoint = '/data/score-frequency';
        const queryParams = [];

        if (fromDate) queryParams.push(`from=${encodeURIComponent(fromDate)}`);
        if (toDate) queryParams.push(`to=${encodeURIComponent(toDate)}`);

        if (queryParams.length > 0) {
            endpoint += `?${queryParams.join("&")}`;
        }

        const response = await api.get(endpoint, {
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


export const fetchAllSentiment = async (fromDate = '', toDate = '') => {
    try {
        console.log("⏳ Fetching all sentiment data...");

        const token = localStorage.getItem('userToken'); // Ambil token
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        // Buat endpoint dengan filter dari `fromDate` dan `toDate`
        let endpoint = '/data/all-sentiment';
        if (fromDate && toDate) {
            endpoint += `?from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}`;
        }

        const response = await api.get(endpoint, {
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
}

export const fetchSentimentDistribution = async (token, from = "", to = "") => {
    if (!token) {
        console.error("⚠ Token tidak tersedia, silakan login ulang.");
        return null;
    }

    try {
        let endpoint = "/data/sentiment-distribution";
        if (from && to) {
            endpoint += `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
        }

        const response = await api.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching sentiment data:", error);
        throw error;
    }
};

export const fetchSentimentCloud = async (fromDate = '', toDate = '') => {
    try {
        console.log("⏳ Fetching sentiment cloud data...");

        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        // Buat endpoint dengan filter dari `fromDate` dan `toDate`
        let endpoint = '/data/sentiment-cloud';
        if (fromDate && toDate) {
            endpoint += `?from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}`;
        }

        const response = await api.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("✅ Sentiment cloud data fetched successfully:", response.data);

        // Pisahkan kata berdasarkan sentimen
        const positiveWords = response.data
          .filter((item) => item.sentiment === "1")
          .map((item) => ({ text: item.word, size: item.frequency }));

        const negativeWords = response.data
          .filter((item) => item.sentiment === "0")
          .map((item) => ({ text: item.word, size: item.frequency }));

        console.log("🔹 Positive Words:", positiveWords);
        console.log("🔻 Negative Words:", negativeWords);

        return { positive: positiveWords, negative: negativeWords };
    } catch (error) {
        console.error("❌ Error fetching sentiment cloud data:", error.message);
        throw new Error('Failed to fetch sentiment cloud data: ' + error.message);
    }
};


export const fetchAppDetail = async () => {
    try {
        console.log("⏳ Fetching app details...");
        
        const token = localStorage.getItem('userToken'); // Ambil token
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        const response = await api.get('/data/app-detail', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("✅ App details fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching app details:", error.message);
        throw new Error('Failed to fetch app details: ' + error.message);
    }
};

export const fetchLatestDate = async () => {
    try {
        console.log("⏳ Fetching app latest date...");

        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error("Token not found in localStorage.");
        }

        console.log("🔑 Using Bearer Token:", token);

        const response = await api.get('/data/latest-review-date', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("✅ Latest date data fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching app detail data:", error.message);
        throw new Error('Failed to fetch app detail data: ' + error.message);
    }
};

// src/api/restAPI.jsx
export const fetchPriorityReviews = async (offset = 0, keyword = '', from = '', to = '') => {
    try {
        console.log("🚀 Fetching reviews with offset:", offset, "keyword:", keyword, "from:", from, "to:", to);

        let endpoint = `/data/priority-review?offset=${offset}`;

        if (keyword) {
            endpoint = `/data/priority-review/search?offset=${offset}&keyword=${encodeURIComponent(keyword)}`;
        }

        // Tambahkan filter `from` dan `to` jika ada
        const params = new URLSearchParams();
        if (from) params.append("from", from);
        if (to) params.append("to", to);

        if (params.toString()) {
            endpoint += `&${params.toString()}`;
        }

        const token = localStorage.getItem('userToken');
        if (!token) throw new Error("Token not found");

        const response = await api.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("✅ Data diterima:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching reviews:", error);
        throw error;
    }
};


export default api;