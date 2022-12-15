import React, { createContext,useState } from 'react'
import { useNotification } from '../hooks/themeHook';
import { getMovies } from '../api/movie';
const MovieContext = createContext();

let totalPages;
const limit = 7;
let currentPageNo = 0;


function MoviesProvider({ children }) {

  const [reachToEnd, setReachToEnd] = useState(false)
  const [movies, setMovies] = useState([])
  const [latestUploads, setLatestUploads] = useState([])
  const { updateNotification } = useNotification();

  const fetchLatestUploads = async (qty = 5) => {
    const { error, movies } = await getMovies(0, qty)
    if (error) return updateNotification('error', error)
    setLatestUploads([...movies])
  }

  const fetchMovies = async (pageNo = currentPageNo) => {
    const { error, movies, allMovies } = await getMovies(pageNo, limit)
    totalPages = Math.ceil(allMovies / limit);
    // console.log(totalPages);
    if (error) return updateNotification('error', error)
    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReachToEnd(true)
    }
    setMovies([...movies])
  }

  const fetchNextPage = () => {
    if (reachToEnd) return;
    currentPageNo += 1
    fetchMovies(currentPageNo)
  }
  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachToEnd) setReachToEnd(false)
    currentPageNo -= 1
    fetchMovies(currentPageNo)
  }


  return <MovieContext.Provider value={{ movies,latestUploads,fetchLatestUploads, fetchMovies, fetchNextPage, fetchPrevPage, totalPages, currentPageNo }} >
    {children}
  </MovieContext.Provider>
}

export { MoviesProvider, MovieContext }