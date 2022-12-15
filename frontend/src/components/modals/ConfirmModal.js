import React from 'react'
import ModalContainer from './ModalContainer'
import { ImWarning, ImSpinner9 } from 'react-icons/im'


function ConfirmModal({visible,onConfirm,onCancel,busy,title,subtitle}) {

 const commonClasses = 'px-3 py-1 text-white rounded'

  return (
    <ModalContainer visible={visible} ignoreContainer  >
      <div className="dark:bg-primary rounded bg-white px-14 py-4 relative">
        <h1 className='text-red-400 font-semibold text-lg'><ImWarning className=' absolute top-[35%] left-5' size='18' />{title}</h1>
        <p className='text-secondary dark:text-white text-sm'>{subtitle}</p>
        <div className='flex items-center space-x-3 mt-5'>
          {busy ? <p className=' text-primary dark:text-white flex items-center space-x-2'>
            <ImSpinner9 className='animate-spin' />
            <span>Please wait</span>
          </p> :
          <>
          <button onClick={onConfirm} type='button' className={commonClasses + ' bg-red-400'} >Confirm</button>
          <button onClick={onCancel} type='button' className={commonClasses + ' bg-cyan-400'} >Cancel</button>
          </>}
        </div>
      </div>
    </ModalContainer>
  )
}

export default ConfirmModal
