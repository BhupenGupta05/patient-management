import React from 'react'

const StatusButton = ({Icon, text, styleClass}) => {
  return (
    <button className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${styleClass}`}>
        {Icon && <Icon className="mr-1 w-4 h-4" />}
        <span className='text-xs'>{text}</span>
    </button>
  )
}

export default StatusButton