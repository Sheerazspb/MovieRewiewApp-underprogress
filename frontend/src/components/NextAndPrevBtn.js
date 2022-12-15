import React from 'react'

function NextAndPrevBtn({ handlePrevClick, handleNextClick }) {
  return (
    <div className="flex justify-center items-center space-x-3 mt-5">
      <button onClick={handlePrevClick} type='button' className='text-primary dark:text-white hover:underline text-xl'>Prev</button>
      <button onClick={handleNextClick} type='button' className='text-primary dark:text-white hover:underline text-xl'>Next</button>
    </div>
  )
}

export default NextAndPrevBtn
