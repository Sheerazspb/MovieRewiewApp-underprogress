import React from 'react'

function Title({children}) {
  return (
    <div>
      <h1 className='dark:text-white text-secondary  text-center text-2xl mb-6'>{children}</h1>
    </div>
  )
}

export default Title
