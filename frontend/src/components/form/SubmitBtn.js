import React from 'react'
import { ImSpinner9 } from 'react-icons/im'

function SubmitBtn({value,busy,type,onClick}) {
  return (
    <button type={type || "submit"} onClick={onClick} className='w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-80 transation p-1 text-lg cursor-pointer h-10 flex items-center justify-center'>
      {busy ? <ImSpinner9 className='animate-spin'/>:value}
    </button>  
  )
}

export default SubmitBtn
