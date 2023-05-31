'use client'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Cookie from 'js-cookie'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
dayjs.locale(ptBR)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
  content: string
}

export default async function Memories({ params }) {
  const router = useRouter()
  const token = Cookie.get('token')

  const response = await api.get(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (router.isFallback) {
    return <div>Carregando...</div>
  }

  return (
    <div>
      <div className="flex flex-col gap-10 overflow-x-hidden p-8">
        <Link
          href="/"
          className="mt-3 flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <div key={memories.id} className="space-y-4">
          <div className="flex justify-between">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memories.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
          </div>
          <Image
            src={memories.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="break-words text-lg leading-relaxed text-gray-100">
            {memories.content}
          </p>
        </div>
      </div>
    </div>
  )
}
