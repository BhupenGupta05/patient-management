import React from 'react'

const Copyright = () => {
  return (
    <footer
      className="text-xs text-gray-500"
      aria-label='aria-label="Copyright notice'>
      &copy; {new Date().getFullYear()} WeCare. All rights reserved.
    </footer>
  )
}

export default Copyright