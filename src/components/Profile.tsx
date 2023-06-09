import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  /* eslint-disable */
  const { name, avatar_url } = getUser()

  return (
    <div className="flex items-center gap-3 text-left ">
      <Image
        /* eslint-disable */
        src={avatar_url}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />
      <p className="max-w-[150px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}
