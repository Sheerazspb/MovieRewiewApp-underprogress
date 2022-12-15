import React from 'react'

function NotFoundText({text,visible}) {
  if(!visible) return null;
  return (
    <h1 className='text-primary dark:text-white text-3xl font-semibold text-center p-5 opacity-40'>{text}</h1>
  )
}

export default NotFoundText
