import React,{useState,useEffect} from 'react'
import { getMovieForUpdate, updateMovie } from '../../api/movie'
import { useNotification } from '../../hooks/themeHook'
import MovieForm from '../admin/MovieForm'
import ModalContainer from './ModalContainer'

function UpdateMovie({visible,onSuccess,movieId}) {

  const [busy,setBusy] = useState(false)
  const [ready,setReady] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const {updateNotification} = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true)
    const { error, message, movie } = await updateMovie(movieId,data)
    setBusy(false)
    if(error) return updateNotification('error',error)
    updateNotification('success', message)
    onSuccess(movie)
    // onClose();
  }

  const fetchMovieToUpdate = async () => {
    const {error,movie} = await getMovieForUpdate(movieId)
    if (error) return updateNotification("error",error)
    setSelectedMovie(movie)
    setReady(true )
    // setShowUpdateMovieModal(true)
    
    // setMovies([...updatedMovies])
  }

  useEffect(() => {
    if (movieId)fetchMovieToUpdate()
    // eslint-disable-next-line
  },[movieId])

  return (
    <ModalContainer visible={visible}>
      {ready ? <MovieForm intialState={selectedMovie} btnTitle='Update' onSubmit={!busy ? handleSubmit : null} busy={busy} /> : 
      <div className='w-full h-full flex justify-center items-center'>
        <p className='text-xl text-light-subtle dark:text-dark-subtle animate-pulse'>Please wait...</p>
      </div> }
    </ModalContainer>
  )
}

export default UpdateMovie
