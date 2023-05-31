import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nlw-artur-backend.vercel.app/',
})
