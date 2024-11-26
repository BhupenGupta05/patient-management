import React from 'react'

const Title = ({title, heading, subheading, className}) => {
  return (
    <header className={`${className} max-w-2xl`}>
            <h2 className="text-2xl font-bold text-indigo-600 mb-6"
            >
                {title}
            </h2>

            <h4 className='text-3xl font-bold mb-2'>{heading}</h4>
            <p className='text-sm mb-8'>{subheading}</p>
        </header>
  )
}

export default Title