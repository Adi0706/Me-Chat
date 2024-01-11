import React from 'react'

function NavBar({createNewChat}) {
  return (
    <>
    <nav>
    <div className="heading-container">
        <h1>K-AI</h1>
        <button onClick={createNewChat}>RESET</button>
      </div>
      </nav>
    </>
  )
}

export default NavBar