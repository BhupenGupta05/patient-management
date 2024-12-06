import React from 'react'

const CustomButton = ({ className="", children, disabled=false, handleClick, type='submit' }) => {
  return (
    <button 
    onClick={handleClick} 
    type={type} 
    disabled={disabled}
    className={`btn-class ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {children}
    </button>
  )
}

export default CustomButton