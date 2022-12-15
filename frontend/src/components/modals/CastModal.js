import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaCrown } from 'react-icons/fa'
import ModalContainer from './ModalContainer'

function CastModal({ casts = [], visible, onClose, onRemoveClick }) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[40rem] max-h-[45rem] overflow-auto p-2 custom-scroll-bar">    {casts.map(({ profile, roleAs, leadActor }) => {
       const {name,avatar,_id} = profile
       return (
        <div key={_id} className='flex space-x-3 dark:bg-secondary bg-white drop-shadow-xl rounded'>
          <img className='w-16 h-16 object-cover aspect-square rounded' src={avatar.url} alt={name} />
          <div className='flex w-full flex-col justify-between'>
          <div>
          <div className='flex'>
          <p className='  dark:text-white text-primary font-semibold'>{name}</p>
                  {leadActor && <FaCrown size={18} className=' text-yellow-400 ml-1'/>}
          </div>
          <p className='  dark:text-dark-subtle text-light-subtle text-sm'>{roleAs}</p>
          {/* {leadActor && <FaCrown className=' text-yellow-400' />} */}
          </div>
          
          </div>
          <button onClick={() => onRemoveClick(_id)} className='dark:text-white text-primary hover:opacity-80 transition p-2 '>
            <AiOutlineClose />
          </button>
        </div>)
      })}
      </div>

    </ModalContainer>
  )
}

export default CastModal
