import React from 'react'

const Copyright = () => {
  return (
    <p
      className="text-xs text-gray-500"
      aria-label='aria-label="Copyright notice'>
      &copy; {new Date().getFullYear()} WeCare. All rights reserved.
    </p>
  )
}

export default Copyright