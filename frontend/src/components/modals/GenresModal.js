import React, { useState,useEffect } from 'react'
import genres from '../../utils/genres'
import SubmitBtn from '../form/SubmitBtn'
import ModalContainer from './ModalContainer'

function GenresModal({ visible, onClose, onSubmit, previousSelection }) {
  const [selectedGenres, setSelectedGenres] = useState([])
  const handleGenreSelector = (gen) => {
    let newGenres = []
    if (selectedGenres.includes(gen)) newGenres = selectedGenres.filter(genre => genre !== gen)
    else newGenres = [...selectedGenres, gen]
    setSelectedGenres([...newGenres]);
  }

  const handleSubmit = () => {
    onSubmit(selectedGenres)
    onClose()
  }

  const handleClose = () => {
    setSelectedGenres(previousSelection)
    onClose()
  }

  useEffect(() => {
    setSelectedGenres(previousSelection)
  }, [previousSelection])

  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="flex justify-between flex-col h-full">
        <div>
          <h1 className='dark:text-white text-primary text-2xl text-center font-semibold'>Select Genres</h1>
          <div className='space-y-3 mt-3'>
          {genres.map((gen) => {
            return <Genre onClick={() => handleGenreSelector(gen)} key={gen} selected={selectedGenres.includes(gen)}>{gen}</Genre>
          })}
        </div>
        </div>
        
        <div className='w-56 self-center mb-56 font-semibold'>
          <SubmitBtn value='Select' type='button' onClick={handleSubmit}  />
        </div>
        
      </div>
    </ModalContainer>
  )
}

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected ? "dark:bg-white dark:text-primary bg-light-subtle text-white" : " text-primary dark:text-white"
  }
  return (
    <button onClick={onClick} className={
      (getSelectedStyle()) +
      ' border-2 dark:border-dark-subtle border-light-subtle   p-1 rounded mr-3'} >{children}</button>
  )
}

export default GenresModal
