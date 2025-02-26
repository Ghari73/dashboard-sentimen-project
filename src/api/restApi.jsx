import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dashboard-be-245315940020.asia-southeast2.run.app/api/auth/login',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
})

export const fetchLogin = async (postData) => {
    try{
        const response = await api.post('',postData)
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

export default api;