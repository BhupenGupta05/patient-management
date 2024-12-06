import React from 'react'

const Copyright = () => {
  return (
    <footer
      className="text-xs md:text-sm text-gray-500"
      aria-label='aria-label="Copyright notice'>
      &copy; {new Date().getFullYear()} NurtureMed.
    </footer>
  )
}

export default Copyright