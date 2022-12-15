import React, { useState, useEffect } from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { deleteActor, getActors, searchActor } from '../../api/actor'
import { useNotification, useSearch } from '../../hooks/themeHook'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import UpdateActor from '../modals/UpdateActor'
import AppSearchForm from '../form/AppSearchForm'
import NotFoundText from '../NotFoundText'
import ConfirmModal from '../modals/ConfirmModal'

let totalPages;
let currentPageNo = 0;
const limit = 16;

function Actors() {

  const [actors, setActors] = useState([])
  const [results, setResults] = useState([])
  const [reachToEnd, setReachToEnd] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false) 
  const [busy, setBusy] = useState(false) 
  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const fetchActors = async (pageNo) => {
    const { profiles, error, allActors } = await getActors(pageNo, limit)
    totalPages = Math.ceil(allActors / limit);
    // console.log(totalPages);
    if (error) return updateNotification('error', error)
    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachToEnd(true)
    }
    setActors([...profiles])
  }

  const handleNextClick = () => {
    if (reachToEnd) return;
    currentPageNo += 1
    fetchActors(currentPageNo)
  }
  const handlePrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachToEnd) setReachToEnd(false)
    currentPageNo -= 1
    fetchActors(currentPageNo)
  }

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true)
    setSelectedProfile(profile);
  }
  const hideUpdateModal = () => {
    setShowUpdateModal(false)
  }
  const handleOnUpdateActor = (profile) => {
    const updateActors = actors.map(actor => {
      // console.log(actor)
      if (profile._id === actor._id) {
       return profile
      }
     return actor;
    })
    setActors([...updateActors])
  }

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor,value,setResults)
    // console.log(value)
  }
  const handleOnRestCloseBtn = () => {
    resetSearch()
    setResults([]);
  }

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true)
  }

  const handleOnConfirmDelete =  async () => {
    setBusy(true)
    const {error,message} = await deleteActor(selectedProfile._id)
    setBusy(false)

    if(error) {
      setShowConfirmModal(false)
      return updateNotification('error',error)
    } 
    updateNotification('success',message)
    setShowConfirmModal(false)
    fetchActors(currentPageNo)
  }

  useEffect(() => {
    fetchActors(currentPageNo)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='mt-3'>
        <div className="flex justify-end mr-5">
          <AppSearchForm placeholder='Search Actors...' classes='border-2 dark:border-dark-subtle border-light-subtle  dark:focus:border-white focus:border-primary dark:text-white text-primary  transition bg-transparent rounded text-lg outline-none p-1' showCloseSearchBtn={results?.length || resultNotFound} onSubmit={handleOnSearchSubmit} onRest={handleOnRestCloseBtn}/>
        </div>
        
        <NotFoundText  text='Result not found!' visible={resultNotFound} />
        <div className='grid grid-cols-4 gap-x-3 gap-y-10 p-5'>

          {results?.length || resultNotFound ? 
           results?.map(actor => (
             <ActorProfile profile={actor} key={actor._id} onDeleteClick={() => handleOnDeleteClick(actor)}  onEditClick={() => handleOnEditClick(actor)} />
          ))
          :
          actors.map(actor => (
            <ActorProfile profile={actor} key={actor._id} onDeleteClick={() => handleOnDeleteClick(actor)} onEditClick={() => handleOnEditClick(actor)} />
          ))}
        </div>
        <div className="flex justify-center items-center space-x-3 mt-5">
          {(currentPageNo !== 0 && !results?.length) && !resultNotFound  ? <button onClick={handlePrevClick} type='button' className='text-primary dark:text-white hover:underline text-xl relative'>
            <MdNavigateBefore className='text-3xl absolute right-9 top-0' />
            Prev
          </button> : null}
          {(currentPageNo !== (totalPages - 1)) && (!results?.length && !resultNotFound) ? <button onClick={handleNextClick} type='button' className='text-primary dark:text-white hover:underline text-xl relative' >
            Next
            <MdNavigateNext className='text-3xl absolute left-9 top-0' />
          </button> : null}
        </div>
      </div>
      <ConfirmModal visible={showConfirmModal} busy={busy} onConfirm={handleOnConfirmDelete} onCancel={() => setShowConfirmModal(false)} title='Are you sure?' subtitle='This action will remove this profile permanently!' />
      <UpdateActor visible={showUpdateModal} onClose={hideUpdateModal} intialState={selectedProfile}
       onSuccess={handleOnUpdateActor}
        />
    </>

  )
}

const ActorProfile = ({ profile, onEditClick,onDeleteClick}) => {

  const [showOptions, setShowOptions] = useState(false)
  const handleOnMouseEnter = () => {
    setShowOptions(true)
  }
  const handleOnMouseLeave = () => {
    setShowOptions(false)
  }

  // const onDeleteClick = () => {

  // }
 
  if (!profile) return null;
  return (
    <div className="dark:bg-light-subtle bg-white border-2 dark:border-cyan-700 border-cyan-200 shadow-2xl h-50  overflow-hidden rounded-full">
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="flex cursor-pointer relative">
        <img src={profile.avatar.url} alt={profile.name} className='w-20 h-[108px] object-cover' />
        <div className='px-2'>
          <h1 className='text-xl dark:text-cyan-400 text-cyan-500  font-semibold whitespace-nowrap'>{profile.name}</h1>
          <p className='text-primary dark:text-white opacity-75 text-xs py-2'>{profile.about.substring(0, 90)}</p>
        </div>
        <Options visible={showOptions} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />
      </div>
    </div>
  )
}

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;
  return <div className='absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex  justify-center items-center space-x-5'>
    <button onClick={onDeleteClick} type='button' className=' p-2 rounded-full bg-red-100 text-red-400 hover:opacity-70 transition' title='Delete' >
      <BsTrash />
    </button>
    <button onClick={onEditClick} title='Edit' type='button' className='p-2 rounded-full bg-cyan-100 text-cyan-400 hover:opacity-70 transition'>
      <BsPencilSquare />
    </button>
  </div >
}

export default Actors
