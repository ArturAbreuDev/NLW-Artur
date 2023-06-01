import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nlw-artur-backend-ah3spl704-arturabreudev.vercel.app/',
})
