import axios from 'axios'

// One place for the backend address. Set VITE_BACKEND_URL in client/.env to change it.
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

// withCredentials lets the browser send the httpOnly login cookies (token / admintoken).
export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})
