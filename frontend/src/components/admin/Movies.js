import React, { useEffect } from 'react'
// import { deleteMovie, getMovieForUpdate} from '../../api/movie';
import { useMovies } from '../../hooks/themeHook';
import { MovieListItem } from '../MovieListItem'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
// import UpdateMovie from '../modals/UpdateMovie';
// import ConfirmModal from '../modals/ConfirmModal';

// let totalPages;
// const limit = 7;
// let currentPageNo = 0;

function Movies() {

  // const [movies,setMovies] = useState([])
  // const [showUpdateMovieModal,setShowUpdateMovieModal] = useState(false)
  // // const [showConfirmModal,setShowConfirmModal] = useState(false)
  // const [busy,setBusy] = useState(false)
  // const [selectedMovie,setSelectedMovie] = useState(null)
  // // const [reachToEnd, setReachToEnd] = useState(false)
  // const {updateNotification} = useNotification();
  const { movies: newMovies, fetchMovies, fetchNextPage, fetchPrevPage, totalPages, currentPageNo } = useMovies();

  // const fetchMovies = async (pageNo) => {
  //   const {error,movies,allMovies} = await getMovies(pageNo,limit)
  //   totalPages = Math.ceil(allMovies / limit);
  //   // console.log(totalPages);
  //   if (error) return updateNotification('error',error)
  //   if (!movies.length) {
  //     currentPageNo = pageNo - 1;
  //     return setReachToEnd(true)
  //   }
  //   setMovies([...movies])
  // }

  // const handleNextClick = () => {
  //   if (reachToEnd) return;
  //   currentPageNo += 1
  //   fetchMovies(currentPageNo)
  // }
  // const handlePrevClick = () => {
  //   if (currentPageNo <= 0) return;
  //   if (reachToEnd) setReachToEnd(false)
  //   currentPageNo -= 1
  //   fetchMovies(currentPageNo)
  // }
  // const handleOnEditClick = async ({_id}) => {
  //   const {error,movie} = await getMovieForUpdate(_id)
  //   if (error) return updateNotification("error",error)
  //   setSelectedMovie(movie)
  //   setShowUpdateMovieModal(true)
  // }
  // const handleOnDeleteClick =  (movie) => {
  //   setSelectedMovie(movie)
  //   setShowConfirmModal(true)
  // }
  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true)
  //   const {error,message} = await deleteMovie(selectedMovie._id)
  //   setBusy(false)
  //   if(error) return updateNotification('error',error)
  //   updateNotification('success',message) 
  //   hideConfirmModal()
  //   fetchMovies(currentPageNo)
  // }

  // const handleOnUpdateMovie = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if(m._id === movie._id) return movie;
  //     return m;
  //   })
  //   setMovies([...updatedMovies])
  // }

  // const hideMovieUpdateForm = () => {
  //   setShowUpdateMovieModal(false)
  // }
  const handleUIUpdate = () => {
    fetchMovies()
  }


  useEffect(() => {
    fetchMovies()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='space-y-2 p-5 dark:bg-primary bg-dark-subtle'>
        {newMovies.map(movie => {
          return <MovieListItem movie={movie} key={movie._id} afterDelete={handleUIUpdate} afterUpdate={handleUIUpdate} />
        })}
        <div className="flex justify-center items-center space-x-3 py-5">
          {currentPageNo !== 0 && <button onClick={fetchPrevPage} type='button' className='text-primary dark:text-white hover:underline text-xl relative'>
            <MdNavigateBefore className='text-3xl absolute right-9 top-0' />
            Prev</button>}
          {currentPageNo !== (totalPages - 1) && <button onClick={fetchNextPage} type='button' className='text-primary dark:text-white hover:underline text-xl relative'>
            Next
            <MdNavigateNext className='text-3xl absolute left-9 top-0' />
          </button>}
        </div>
      </div>
    </>


  )
}

export default Movies
