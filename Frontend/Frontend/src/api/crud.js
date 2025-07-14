import axios from 'axios'

const API = 'http://localhost:4000/crud' 
export const productRequest = producto => axios.post(`${API}/tasks`, producto)