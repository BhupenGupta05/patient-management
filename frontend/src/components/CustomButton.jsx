import React from 'react'

const CustomButton = ({ className, children, disabled, handleClick }) => {
  return (
    <button onClick={handleClick} type='submit' className={`btn-class ${className}`}>
        {children}
    </button>
  )
}

export default CustomButton