import React, { useState } from 'react'
import { BsArrowUpRight, BsPencilSquare, BsTrash } from 'react-icons/bs'
import { deleteMovie } from '../api/movie'
import { useNotification } from '../hooks/themeHook'
import ConfirmModal from './modals/ConfirmModal'
import UpdateMovie from './modals/UpdateMovie'

export const MovieListItem = ({ movie, afterDelete,afterUpdate }) => {

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState(null) 
  const [busy, setBusy] = useState(false)
  const [showUpdateMovieModal, setShowUpdateMovieModal] = useState(false)
  const { updateNotification } = useNotification()

  const handleOnDeleteConfirm = async () => {
    setBusy(true)
    const { error, message } = await deleteMovie(movie._id)
    setBusy(false)
    if (error) return updateNotification('error', error)
    updateNotification('success', message)
    afterDelete(movie)
    hideConfirmModal()
  }

  const handleOnEditClick = () => {
    setShowUpdateMovieModal(true)
    setSelectedMovieId(movie._id)
  }
  const handleOnUpdate = (movie) => {
    afterUpdate(movie)
    setShowUpdateMovieModal(false)
    setSelectedMovieId(null)
  }

  const displayConfirmModal = () => {
    setShowConfirmModal(true)
  }
  const hideConfirmModal = () => {
    setShowConfirmModal(false)
  }

  return <>
    <MovieCard movie={movie} onDeleteClick={displayConfirmModal} onEditClick={handleOnEditClick} />
    <div className='p-0'>
      <ConfirmModal visible={showConfirmModal} onConfirm={handleOnDeleteConfirm} onCancel={hideConfirmModal} title='Are you sure?' subtitle='This action will remove this movie permanently!' busy={busy} />
      <UpdateMovie movieId={selectedMovieId} visible={showUpdateMovieModal} onSuccess={handleOnUpdate} />
    </div>
  </>
}

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status, language } = movie;
  return (
    <table className='w-full border-b'>
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className='w-20 aspect-video h-20' src={poster.url} alt={title} />
            </div>
          </td>
          <td className='w-full pl-5'>
            <div className='flex justify-arround h-20 flex-col'>
              <h1 className='font-semibold text-xl text-cyan-500'>{title}</h1>
              <div className='space-x-1'>
                {genres.map((g, index) => {
                  return <span key={g + index} className='text-red-500 text-xs'>{g}</span>
                })}

              </div>
              <p className='text-primary dark:text-white text-sm'>{language}</p>
            </div>
          </td>
          <td className='px-5'>
            <p className='text-primary dark:text-white capitalize'>{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-xl">
              <button onClick={onDeleteClick} type='button' className='text-red-400 hover:opacity-70 transition' title='Delete'>
                <BsTrash />
              </button>
              <button onClick={onEditClick} title='Edit' type='button' className='text-cyan-400 hover:opacity-70 transition'>
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} title='Open in New Tab' type='button' className='text-green-400 hover:opacity-70 transition'>
                <BsArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}