import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Genres = ({setGenre}) => {
  const { data } = useFetch("/genre/movie/list")

  return (
    <div className='container mx-auto py-4 px-4 flex overflow-auto'>
      <div className='flex items-center text-nowrap gap-2 '>
        {data?.genres.map((item) => (
          <span
            onClick={() => setGenre(item.id.toString())}
            key={item.id}
            className='px-4 py-2 
              bg-gray-800 
              text-white 
              rounded-[10px] 
              text-sm 
              font-medium 
              hover:bg-gray-700 
              transition-colors 
              duration-200
              cursor-pointer
            '
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Genres