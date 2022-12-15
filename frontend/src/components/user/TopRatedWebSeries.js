import React, { useState, useEffect } from 'react'
import { getTopRatedMovies } from '../../api/movie';
import { useNotification } from '../../hooks/themeHook'
// import GridContainer from './GridContainer'
// import {AiFillStar} from 'react-icons/ai'
import MovieList from './MovieList';

function TopRatedWebSeries() {

  const [movies, setMovies] = useState([])
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies('Web Series')
    if (error) return updateNotification('error', error)
    setMovies([...movies])
  }


  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  }, [])
  return <MovieList movies={movies} title='Viewers Choice (Web Series)' />

}

export default TopRatedWebSeries
