'use client'
import { api } from '@/lib/api'
import { FiX } from 'react-icons/fi'

interface DeleteProps {
  id: string
  token: any
  imageUrl: any
}

export default function Delete({ id, token }: DeleteProps) {
  const handleDeleteMemory = async () => {
    try {
      await api.delete(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      // Tratar erro de exclusão
    }
    window.location.reload()
  }

  return (
    <button onClick={handleDeleteMemory}>
      <FiX />
    </button>
  )
}
