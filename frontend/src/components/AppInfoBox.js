import React from 'react'

function AppInfoBox({title,subTitle}) {
  return (
    <div className="bg-white shadow-lg dark:bg-secondary p-5 ">
      <h1 className='font-semibold text-2xl mb-2 text-primary dark:text-white'>{title}</h1>
      <p className='text-xl text-primary dark:text-white'>{subTitle}</p>
    </div>
  )
}

export default AppInfoBox
