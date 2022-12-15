import React,{useEffect} from 'react'
// import { deleteMovie, getMovieForUpdate } from '../api/movie'
import { useMovies} from '../hooks/themeHook'
import { MovieListItem } from './MovieListItem'
// import UpdateMovie from './modals/UpdateMovie'
// import ConfirmModal from './modals/ConfirmModal'

// const pageNo = 0
// const limit = 5


function LatestUploads() {

  //  
  const { latestUploads, fetchLatestUploads } = useMovies()

  // const fetchLatestUploads = async () => {
  //   const {error,movies} = await getMovies(pageNo,limit)
  //   if(error) return updateNotification('error',error)
  //   setMovies([...movies])
  // }


  // const handleOnEditClick = async ({ _id }) => {
  //   const { error, movie } = await getMovieForUpdate(_id) 
  //   if (error) return updateNotification("error", error)
  //   setSelectedMovie(movie)
  //   setShowUpdateMovieModal(true)
  // }
  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie)
  //   setShowConfirmModal(true)
  // }
  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true)
  //   const { error, message } = await deleteMovie(selectedMovie._id)
  //   setBusy(false)
  //   if (error) return updateNotification('error', error)
  //   updateNotification('success', message)
  //   hideConfirmModal()
  //   fetchLatestUploads()
  // }

  // const handleOnUpdateMovie = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m._id === movie._id) return movie;
  //     return m;
  //   })
  //   setMovies([...updatedMovies])
  // }

  // const hideMovieUpdateForm = () => {
  //   setShowUpdateMovieModal(false)
  // }
  // const hideConfirmModal = () => {
  //   setShowConfirmModal(false)
  // }
  const handleUIUpdate = () => {
    fetchLatestUploads()
  }


  useEffect(() => {
    fetchLatestUploads()
    // eslint-disable-next-line
  },[])

  return (
    <>
    <div className="bg-white shadow-lg dark:bg-secondary p-5 col-span-2 ">
      <h1 className='font-semibold text-2xl mb-5 text-primary dark:text-white'>Recent Uploads</h1>
      <div className="space-y-3">
        {latestUploads.map(movie => {
          return <MovieListItem movie={movie} key={movie._id} afterDelete={handleUIUpdate} afterUpdate={handleUIUpdate}
          //  onEditClick={() => handleOnEditClick(movie)} onDeleteClick={() => handleOnDeleteClick(movie)}
            />
      })}
      </div>
    </div>
      {/* <ConfirmModal visible={showConfirmModal} onConfirm={handleOnDeleteConfirm} onCancel={hideConfirmModal} title='Are you sure?' subtitle='This action will remove this movie permanently!' busy={busy} />

      <UpdateMovie visible={showUpdateMovieModal} intialState={selectedMovie} onSuccess={handleOnUpdateMovie} onClose={hideMovieUpdateForm} /> */}
    </>
  )
}

// const MovieListItem = ({ movie,onDeleteClick,onEditClick,onOpenClick }) => {
//   const { poster, title, genres = [],status } = movie;
//   return (
//     <table className='w-full border-b'>
//       <tbody>
//         <tr>
//           <td>
//             <div className="w-24">
//               <img className='w-full aspect-video' src={poster} alt={title} />
//             </div>
//           </td>
//           <td className='w-full pl-5'>
//             <div>
//               <h1 className='font-semibold text-lg text-primary dark:text-white'>{title}</h1>
//               <div className='space-x-1'>
//                 {genres.map((g, index) => {
//                   return <span key={g + index} className='text-primary dark:text-white text-xs'>{g}</span>
//                 })}
//               </div>
//             </div>
//           </td>
//           <td className='px-5'>
//             <p className='text-primary dark:text-white'>{status}</p>
//           </td>
//           <td>
//             <div className="flex items-center space-x-3 text-xl">
//               <button onClick={onDeleteClick} type='button' className='text-red-400 hover:opacity-70 transition' title='Delete'>
//                 <BsTrash />
//               </button>
//               <button onClick={onEditClick} title='Edit' type='button' className='text-cyan-400 hover:opacity-70 transition'>
//                 <BsPencilSquare />
//               </button>
//               <button onClick={onOpenClick} title='Open in New Tab' type='button' className='text-green-400 hover:opacity-70 transition'>
//                 <BsArrowUpRight />
//               </button>
//             </div>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }

export default LatestUploads
