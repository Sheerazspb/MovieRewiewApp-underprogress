import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovieForAdmin } from '../../api/movie'
import { useNotification } from '../../hooks/themeHook'
import { MovieListItem } from '../MovieListItem'
import NotFoundText from '../NotFoundText'


function SearchMovies() {

  const [movies,setMovies] = useState([])
  const [resultNotFound,setResultNotFound] = useState(false)
  const [searchParams] =  useSearchParams()
  const {updateNotification} = useNotification();
  const query = searchParams.get('title')

  const searchMovies = async (val) => {
    const {error,results} = await searchMovieForAdmin(val)
    if(error) return updateNotification('error',error)
    if(!results.length) {
      setResultNotFound(true)
      return setMovies([])
    }
    setResultNotFound(false)
    setMovies([...results])
  }

  const handleAfterUpdate = (movie) => {
    const updatedMovies = movies.map((m) => {
      if(m._id === movie._id) return movie;
      return m;
    });
    setMovies([...updatedMovies])
  }
  const handleAfterDelete = (movie) => {
    const  updatedMovies =  movies.filter((m) => m._id !== movie._id);
    setMovies([...updatedMovies ])
  }


  useEffect(() => {
    if(query.trim()) searchMovies(query)
    // eslint-disable-next-line
  },[query])

  return (
    <div className='p-5 space-y-3'>
      <NotFoundText text='Record not found!' visible={resultNotFound} />
      { !resultNotFound && movies.map(movie => {
        return <MovieListItem movie={movie} key={movie._id} afterUpdate={handleAfterUpdate} afterDelete={handleAfterDelete} />
      })}
    </div>
  )
}

export default SearchMovies
