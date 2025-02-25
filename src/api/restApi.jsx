import axios from 'axios';

const api = axios.create({
    baseURL: 'https://multimatics-backend-245315940020.asia-southeast2.run.app/api/auth/login',
    header: {
        'Content-Type': 'application/json',
    }
})

export const fetchLogin = async (postData) => {
    try{
        const response = await api.post('',postData)
        return response.data
    } catch (error){
        throw new Error('Failed to login users: '+ error.message)
    }
}

export default api;