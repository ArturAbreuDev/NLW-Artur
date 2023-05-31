'use client'

import { useEffect, useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'

interface User {
  id: string
  name: string
  avatarUrl: string
}

export function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [usersData, setUsersData] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const token = Cookie.get('token')

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const usersData = response.data
        setUsersData(usersData)
        console.log(usersData)
      } catch (error) {
        // Tratar erro de exclusão
      }
    }

    if (isModalOpen) {
      handleSearch()
    }
  }, [isModalOpen, token])

  const handleSearchButtonClick = (event: any) => {
    event.preventDefault()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (event: any) => {
    const query = event.target.value
    setSearchQuery(query)

    const filtered = usersData.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase()),
    )

    setFilteredUsers(filtered)
  }

  return (
    <div>
      <button
        type="submit"
        onClick={handleSearchButtonClick}
        className="flex items-center"
      >
        <FiSearch size={25} color="#9e9ea0" />
        <span className="ml-2 text-gray-200">
          Veja as memórias de outros usuários
        </span>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 backdrop-blur-md">
          <div className="mx-auto mt-7 max-w-md rounded-xl bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-7">
            <div className="mb-5 flex justify-end">
              <button onClick={handleCloseModal}>
                <FiX size={20} color="red" />
              </button>
            </div>
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-black dark:text-white">
                Ache outros usuários e veja suas memórias!
              </h1>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <div className="relative">
                      <div className="absolute left-0 top-0 flex h-full items-center pl-3">
                        <FaUser size={20} color="#000" />
                      </div>
                      <input
                        type="text"
                        id="search"
                        name="search"
                        className="block w-full rounded-md border-2 border-gray-200 px-10 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                        aria-describedby="search-error"
                        value={searchQuery}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {searchQuery && (
                    <div>
                      <ul>
                        {filteredUsers.map((user) => (
                          <li key={user.id}>
                            <a href={`/memories/usuarios/${user.id}`}>
                              <div className="mt-4 flex items-center gap-5 text-left">
                                <img
                                  src={user.avatarUrl}
                                  width={40}
                                  height={40}
                                  alt=""
                                  className="h-10 w-10 rounded-full"
                                />
                                <p className="max-w-[150px] text-sm leading-snug">
                                  {user.name}
                                </p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
