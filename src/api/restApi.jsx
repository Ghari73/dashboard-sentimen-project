import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dashboard-be-245315940020.asia-southeast2.run.app/api/auth/login',
    headers: {
        'Content-Type': 'application/json',
    }
})

export const fetchLogin = async (postData) => {
    try{
        const response = await api.post('',postData)
        alert('PIPPIIAXJHBXJHABHXB')
        return response.data
    } catch (error){
        console.error('Error Response:', error.response);
        alert('Failed to login users: '+ error.message)
        throw new Error('Failed to login users: '+ error.message)
    }
}

export default api;