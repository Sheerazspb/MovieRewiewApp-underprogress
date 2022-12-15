import React from 'react'

function ModalContainer({visible,children,onClose,ignoreContainer}) {
  const handleClick = (e) => {
    if(e.target.id === 'modal-container') onClose && onClose();
  }
  const renderChildren = () => {
    if(ignoreContainer) return children;
    return (
      <div className='custum-scroll-bar dark:bg-primary bg-white rounded w-[40rem] h-[45rem] overflow-auto p-2'>
        {children}
      </div> 
    )
  }
  if(!visible) return null;
  return (
    <div onClick={handleClick} id='modal-container' className='fixed inset-0 z-30 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex justify-center items-center'>
      {renderChildren()}
    </div>
  )
}

export default ModalContainer
