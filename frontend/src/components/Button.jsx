import React from 'react'

function Button({label, onClick}) {
  return (
    <button
      onClick={onClick}
     className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold"
    >
      {label}
    </button>
  )
}

export default Button