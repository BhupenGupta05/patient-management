import React from 'react'

const FactCard = ({icon, text, aggregate}) => {
  return (
    <div className='bg-yellow-300 w-72 h-28 flex flex-col gap-2 items-start justify-center p-6 rounded-lg'>
        <div className='flex flex-row gap-4'>
            {icon}
            {aggregate}
        </div>
        <p>{text}</p>
    </div>
  )
}

export default FactCard