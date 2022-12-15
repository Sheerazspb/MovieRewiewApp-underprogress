import React,{useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function AppSearchForm({placeholder,classes,onSubmit,showCloseSearchBtn,onRest}) {
  
  const [value,setValue] = useState('');
  // const closeBtnClasses = 'dark:text-dark-subtle text-light-subtle';
 
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  }
  const handleReset = (e) => {
    setValue('')
    onRest();
  }

  return (
    <form className='relative' onSubmit={handleOnSubmit}>
      <input type="text" className={classes} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
      {showCloseSearchBtn ? <button onClick={handleReset} type='button' className='absolute top-[25%] hover:opacity-70 right-2 size-10 text-gray-400'><AiOutlineClose size='18' /></button> : null  }
    </form>
  )
}

export default AppSearchForm
