import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ModalContainer from './ModalContainer'

function WritersModals({profiles=[],visible,onClose,onRemoveClick}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[40rem] max-h-[45rem] overflow-auto p-2 custom-scroll-bar">    {profiles.map(({_id,name,avatar}) => {
        return <div key={_id} className='flex space-x-3 dark:bg-secondary bg-white drop-shadow-xl rounded'>
          <img className='w-16 h-16 object-cover aspect-square rounded' src={avatar.url} alt={name} />
          <p className=' w-full dark:text-white text-primary font-semibold'>{name}</p>
          <button onClick={() => onRemoveClick(_id)} className='dark:text-white text-primary hover:opacity-80 transition p-2 '>
            <AiOutlineClose/>
          </button>
        </div>
      })}
      </div>
  
    </ModalContainer>
  )
}

export default WritersModals
