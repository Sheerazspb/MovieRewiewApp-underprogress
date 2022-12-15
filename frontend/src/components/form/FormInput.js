import React from 'react'

function FormInput({name,label,placeholder,...rest}) {
  return (
    <div className='flex flex-col-reverse'>
      <input id={name} name={name} className='bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle  w-full  outline-none dark:focus:border-white focus:border-x-primary dark:text-white p-2 peer transition' placeholder={placeholder} {...rest} />
      <label className='text-lg dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary self-start' htmlFor={name}>{label}</label>
    </div>

  )
}

export default FormInput
