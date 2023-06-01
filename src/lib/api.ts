import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nlw-artur-backend-hzi8qchqw-arturabreudev.vercel.app/',
})
