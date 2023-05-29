'use client'
import { api } from '@/lib/api'
import { FiX } from 'react-icons/fi'

interface DeleteProps {
  id: string
  token: string
  setMemories: React.Dispatch<React.SetStateAction<Memory[]>>
  memories: Memory[]
}

export default function Delete({
  id,
  token,
  setMemories,
  memories,
}: DeleteProps) {
  const handleDeleteMemory = async () => {
    try {
      await api.delete(`/memories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setMemories((prevMemories) =>
        prevMemories.filter((memory) => memory.id !== id),
      )
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
