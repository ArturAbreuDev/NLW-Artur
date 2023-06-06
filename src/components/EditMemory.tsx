'use client'
import { useState } from 'react'
import { api } from '@/lib/api'
import { FiEdit } from 'react-icons/fi'
import { Camera } from 'lucide-react'

interface EditMemoryProps {
  id: string
  token: any
  initialContent: string
  initialCoverUrl: string
  initialIsPublic: boolean
}

export default function EditMemory({
  id,
  token,
  initialContent,
  initialCoverUrl,
  initialIsPublic,
}: EditMemoryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(initialContent)
  const [coverUrl, setCoverUrl] = useState(initialCoverUrl)
  const [isPublic, setIsPublic] = useState(initialIsPublic)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const handleEdit = async () => {
    try {
      let uploadedCoverUrl = coverUrl

      if (selectedImage !== null) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', selectedImage)
        // @ts-ignore-next-line
        uploadFormData.set('fileName', selectedImage.name)
        uploadFormData.set('folder', 'nlw-spacetime')

        const uploadResponse = await api.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          uploadFormData,
          {
            headers: {
              Authorization: `Basic cHJpdmF0ZV9FM2NtVDcxOFhWbzFmZTlvdHhsZ1NhUWlodms9Og==`,
            },
          },
        )

        uploadedCoverUrl = uploadResponse.data.url
      }

      await api.put(
        `/memories/${id}`,
        {
          content,
          coverUrl: uploadedCoverUrl,
          isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // Atualizar as memórias no estado local com os dados editados

      setIsEditing(false)
    } catch (error) {
      // Tratar erro de edição
    }
    window.location.reload()
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setContent(initialContent)
    setCoverUrl(initialCoverUrl)
    setIsPublic(initialIsPublic)
  }

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleMediaSelect = (media: any) => {
    if (media) {
      setSelectedImage(media)
      const url = URL.createObjectURL(media)
      setSelectedImageUrl(url)
    } else {
      setSelectedImage(null)
      setSelectedImageUrl(null)
    }
  }

  if (isEditing) {
    return (
      <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-50 py-10 backdrop-blur">
        <div className="mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2">
          <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6">
            <p className="font-semibold text-gray-800">Editar Memória</p>
            <svg
              className="h-6 w-6 hover:cursor-pointer hover:text-gray-100"
              fill="none"
              stroke="currentColor"
              onClick={handleCancelEdit}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col bg-gray-50 px-6 py-5">
            <p className="mb-2 font-semibold text-gray-700">Texto da memória</p>
            <textarea
              name=""
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-5 h-36 rounded border border-gray-200 bg-white p-5 shadow-sm"
              id=""
            ></textarea>
            <div className="flex flex-col bg-gray-50">
              <p className="mb-2 font-semibold text-gray-700">Imagem:</p>
              <label
                htmlFor="media"
                className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
              >
                <Camera className="h-4 w-4" />
                Anexar mídia
              </label>
              <input
                type="file"
                accept="image/*"
                id="media"
                className="hidden"
                onChange={(e) => handleMediaSelect(e.target.files?.[0])}
              />
              {selectedImageUrl && (
                <img
                  src={selectedImageUrl}
                  alt="Selected media"
                  className="my-3 h-36"
                />
              )}
            </div>
            <hr />

            <div className="mb-3 mt-5 flex items-center space-x-4">
              <input
                className="inline-flex rounded-full"
                type="checkbox"
                id="check1"
                name="check1"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <label
                className="inline-flex font-semibold text-gray-400"
                htmlFor="check1"
              >
                Tornar memória pública
              </label>
              <br />
              <br />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
            <button onClick={handleCancelEdit}>Cancelar</button>
            <button
              onClick={handleEdit}
              className="rounded bg-blue-500 px-4 py-2 font-semibold text-white"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button onClick={handleStartEdit}>
      <FiEdit />
    </button>
  )
}
