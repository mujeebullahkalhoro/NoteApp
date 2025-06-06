import React from 'react'

function Button({ label, style, onClick, type = "submit" }) {
  return (
    <button onClick={onClick} className={style} type={type}>
      {label}
    </button>
  );
}

export default Button;