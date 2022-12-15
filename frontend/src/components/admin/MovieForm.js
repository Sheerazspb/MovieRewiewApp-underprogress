import React, { useState,useEffect } from 'react'
// import { searchActor } from '../../api/actor';
// import { useNotification, useSearch } from '../../hooks/themeHook';
import { useNotification} from '../../hooks/themeHook';
// import { renderItem } from '../../utils/helper';
import { languageOptions, statusOptions, typeOptions } from '../../utils/options';
import { commonInputClasses } from '../../utils/theme';
import { validateMovie } from '../../utils/validator';
import DirectorSelector from '../DirectorSelector';
import CastForm from '../form/CastForm';
import SubmitBtn from '../form/SubmitBtn';
import GenresSelector from '../GenresSelector';
// import LiveSearch from '../LiveSearch';
import CastModal from '../modals/CastModal';
import GenresModal from '../modals/GenresModal';
// import ModalContainer from '../modals/ModalContainer';
import WritersModals from '../modals/WritersModals';
import PosterSelector from '../PosterSelector';
import Selector from '../Selector';
import TagsInputs from '../TagsInputs'
import WriterSelector from '../WriterSelector';

// export const results = [
//   {
//     id: "1",
//     avatar: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNjgzOTQ1OA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
//     name: "Elizeu Dias"
//   },
//   {
//     id: "2",
//     avatar: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2MDIwNDQxNA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
//     name: "Jesse Ramirez"
//   },
//   {
//     id: "3",
//     avatar: "https://images.unsplash.com/photo-1521198022873-af0f772bf653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2MDIwNDUxMw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
//     name: "Vidar Nordli-Mathisen"
//   },
//   {
//     id: "4",
//     avatar: "https://images.unsplash.com/photo-1520872024865-3ff2805d8bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0OTE3NDQ3NQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
//     name: "Txus Garcia"
//   },
//   {
//     id: "5",
//     avatar: "https://images.unsplash.com/photo-1535788935443-99d4083d03f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY2MDIwNDU2Mg&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
//     name: "Sereja Ris"
//   },
// ]

// export const renderItem = (result) => {

//   return (<div key={result.id} className='flex space-x-2 rounded overflow-hidden'>
//     <img src={result.avatar.url} alt={result.name} className='w-16 h-16 object-cover' />
//     <p className='dark:text-white font-semibold'>{result.name}</p>
//   </div>)

// }

const defaultMovieInfo = {
  title:'',
  storyLine:'',
  tags:[],
  cast:[],
  director:{},
  writers:[],
  releseDate:'',
  poster:null,
  genres:[],
  type:'',
  language:'',
  status:'',
}

function MovieForm({ onSubmit, busy, intialState = defaultMovieInfo,btnTitle }) {
  // console.log(intialState)
  const [movieInfo,setMovieInfo] = useState({...defaultMovieInfo});
  const [showWritersModal,setShowWritersModal] = useState(false);
  const [showCastModal,setShowCastModal] = useState(false);
  const [showGenresModal,setShowGenresModal] = useState(false);
  const [selectedPosterUi,setSelectedPosterUi] = useState('');
  // const [writerName,setWriterName] = useState('');
  // const [writersProfile,setWritersProfile] = useState([]);
  // const [directorsProfile,setDirectorsProfile] = useState([]);
  
  const {updateNotification} = useNotification();
  // const {handleSearch,searching,results,resetSearch} = useSearch()

  const handleSubmit = (e) => {
    e.preventDefault();
    const {error} =  validateMovie(movieInfo)
    if(error) return updateNotification("error",error)

    // tags,cast,genres,writers converting to string to send data to backend API
    const {tags,genres,writers,cast,director,poster} = movieInfo;

    const formData = new FormData();

    const finalMovieInfo = {
      ...movieInfo,
    }

    finalMovieInfo.tags = JSON.stringify(tags)
    finalMovieInfo.genres = JSON.stringify(genres)

    const castId = cast.map((c) => ({
      actor:c.profile._id,
      roleAs:c.roleAs,
      leadActor:c.leadActor
      }))
    finalMovieInfo.cast = JSON.stringify(castId)

    if(writers.length) {
      const writersId = writers.map(w => w._id)
      finalMovieInfo.writers = JSON.stringify(writersId)
    }
    if (director._id) finalMovieInfo.director = director._id
    if (poster) finalMovieInfo.poster = poster

    for(let key in finalMovieInfo) {
      formData.append(key,finalMovieInfo[key])
    }
   onSubmit(formData);
  }

  const handleChange = (e) => {
    const {value,name,files} = e.target;
    if(name === 'poster') {
      const poster = files[0]
      setSelectedPosterUi(URL.createObjectURL(poster))
      return setMovieInfo({ ...movieInfo, poster });
    }
    setMovieInfo({...movieInfo,[name]:value});
  }
  const updateTags = (tags) => {
    setMovieInfo({...movieInfo,tags});
  }
  const updateGenres = (genres) => {
    setMovieInfo({...movieInfo,genres});
  }
  const updateDirector = (profile) => {
    setMovieInfo({...movieInfo,director:profile});
    // resetSearch()
  }
  const updateCast = (castInfo) => {
    const {cast} = movieInfo
    for (let castActor of cast) {
     if (castActor.profile?._id === castInfo.profile._id) {
        return updateNotification('warning', 'This profile is already selected! ')
      }
    }
    setMovieInfo({...movieInfo,cast:[...cast,castInfo]});
  }
  const updateWriters = (profile) => {
    // console.log("profile",profile);
    const {writers} = movieInfo;
    // console.log("writers",writers);
    for(let writer of writers) {
      if(writer._id === profile._id) {
        return updateNotification('warning','This profile is already selected! ')
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers,profile] });
    // setWriterName('')
  }
  
  const handleWriterRemove = (profileId) => {
    // console.log(profileId)
    const {writers} = movieInfo;
    // console.log(writers);
    const newWriters = writers.filter(({_id}) => _id !== profileId)
    if(!newWriters.length) setShowWritersModal(false)
    setMovieInfo({...movieInfo,writers:[...newWriters]})
  }

  const handleCastRemove = (profileId) => {
    const {cast} = movieInfo;
    const newCasts = cast.filter(({profile}) => profile._id !== profileId)
    if(!newCasts.length) setShowCastModal(false)
    setMovieInfo({...movieInfo,cast:[...newCasts]})
  }
  
  const handleDisplayWriters = () => {
    setShowWritersModal(true)
  }
  const handleDisplayCast = () => {
    setShowCastModal(true)
  }
  const displayGenresModal = () => {
    setShowGenresModal(true)
  }

  useEffect(() => {
    setMovieInfo({ ...intialState,
     releseDate: intialState.releseDate.split('T')[0],
      // director:intialState.director
      })
    setSelectedPosterUi(intialState.poster)
  },[intialState])
  
//   const handleProfileChange = ({target}) => {
//     if (target.name === 'director') {
//       setMovieInfo({...movieInfo,director:{name:target.value}})
//       handleSearch(searchActor, target.value,setDirectorsProfile)
//     }
//     if (target.name === 'writers'){
//       setWriterName(target.value)
//       handleSearch(searchActor,target.value,setWritersProfile)
//     } 
//  }

  // const {title,storyLine,director,writers,cast,tags,genres,type,language,status} = movieInfo
  const {title,storyLine,writers,cast,tags,genres,type,language,status,releseDate,director} = movieInfo

  return (
    <>
    <div  className='flex space-x-3'>
      <div className='w-[70%] h-auto space-y-5'>
        <div>
          <label htmlFor="title" className="dark:text-dark-subtle text-light-subtle font-semibold">Title</label>
          <input value={title} name='title' onChange={handleChange} id='title' type="text" className={commonInputClasses + " border-b-2 font-semibold text-xl"}
            placeholder="Titanic" />
        </div>
        <div>
          <label htmlFor="storyLine" className="dark:text-dark-subtle text-light-subtle font-semibold">Story Line</label>
          <textarea value={storyLine} name='storyLine' onChange={handleChange} id='storyLine' className={commonInputClasses + " resize-none h-24 border-b-2"} placeholder="Movie Story Line"></textarea>
        </div>
        <div>
          <label htmlFor="tags" className="dark:text-dark-subtle text-light-subtle font-semibold">Tags</label>
          <TagsInputs value={tags} name="tags" onChange={updateTags}/>
        </div>

        <DirectorSelector onSelect={updateDirector} directorValue={director} />

        {/* <div>
          <label htmlFor="director" className="dark:text-dark-subtle text-light-subtle font-semibold">Director</label>
            <LiveSearch name='director' value={director.name} placeholder='Search Profile' results={directorsProfile} renderItem={renderItem} onSelect={updateDirector} onChange={handleProfileChange} visible={directorsProfile.length} autocomplete='off'/>
        </div> */}

        <div>
          <div className='flex justify-between'>
          <div className='relative'>
            <label htmlFor="writers" className="dark:text-dark-subtle text-light-subtle font-semibold">Writers</label>
              {writers.length > 0 ? <span className='dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 translate-x-5 -translate-y-1 w-5 h-5 rounded-full flex justify-center items-center text-xs'>{ writers.length }</span> : null}
          </div>
              {writers.length > 0 ? <button type='button' onClick={handleDisplayWriters} className='dark:text-white text-primary hover:underline transition'>View All</button> : null}
          </div>

            <WriterSelector onSelect={updateWriters} />
            {/* <LiveSearch name='writers' placeholder='Search Profile' results={writersProfile} renderItem={renderItem} onSelect={updateWriters} onChange={handleProfileChange} value={writerName} visible={writersProfile.length} /> */}
        </div>
        
        <div>
        <div className='flex justify-between'>
        <div className='relative'>
            <label htmlFor="cast" className="dark:text-dark-subtle text-light-subtle font-semibold">Add Cast & Crew</label>
              {cast.length > 0 ? <span className='dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 translate-x-5 -translate-y-1 w-5 h-5 rounded-full flex justify-center items-center text-xs'>{cast.length}</span> : null}
              </div>
              {cast.length > 0 ? <button type='button' onClick={handleDisplayCast} className='dark:text-white text-primary hover:underline transition'>View All</button> : null}
              </div>
         <CastForm onSubmit={updateCast}/> 
        </div>
        <input type="date" name="releseDate" className={commonInputClasses + " border-2 rounded p-1  w-auto"} onChange={handleChange} value={releseDate}  />
        <SubmitBtn busy={busy} value={btnTitle} onClick={handleSubmit} type='button'/>
      </div>
      <div className='w-[30%] h-5 space-y-5'>
          <PosterSelector label='Select Poster' accept='image/jpg,image/jpeg,image/png' name='poster' onChange={handleChange} selectedPoster={selectedPosterUi} />
          <div className='relative'>
            {genres.length > 0 ? <span className='dark:bg-dark-subtle bg-light-subtle text-white absolute bottom-6 left-32   translate-x-5 -translate-y-1 w-5 h-5 rounded-full flex justify-center items-center text-xs'>{genres.length}</span> : null}
          <GenresSelector onClick={displayGenresModal} />
          </div>
          
          <Selector onChange={handleChange} name='type' value={type}  options={typeOptions}  label="Type"/>
          <Selector onChange={handleChange} name='language' value={language}  options={languageOptions} label="Language"/>
          <Selector onChange={handleChange} name='status' value={status} options={statusOptions}  label="Status"/>
      </div>
    </div>

    <WritersModals onClose={() => setShowWritersModal(false)} profiles={writers} visible={showWritersModal} onRemoveClick={handleWriterRemove} />

    <CastModal onClose={() => setShowCastModal(false)} casts={cast} visible={showCastModal} 
    onRemoveClick={handleCastRemove} />
    <GenresModal onSubmit={updateGenres } previousSelection={genres} visible={showGenresModal} onClose={() => setShowGenresModal(false)} />
    </>
    
  )
}

export default MovieForm
