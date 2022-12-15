import React, { useState} from 'react'
import { searchActor } from '../../api/actor'
import { useNotification, useSearch } from '../../hooks/themeHook'
import { renderItem } from '../../utils/helper'
import { commonInputClasses } from '../../utils/theme'
// import { results } from '../admin/MovieForm'
import LiveSearch from '../LiveSearch'

const defaultCastInfo = {
  profile: {},
  roleAs: '',
  leadActor: false
}

function CastForm({onSubmit}) {
  const [castInfo,setCastInfo] = useState({...defaultCastInfo})
  const [profiles,setProfiles] = useState([])
  const {updateNotification} = useNotification();
  const {handleSearch,resetSearch} = useSearch();

  const handleOnChange = ({target}) => {
    const {checked,name,value} = target
    if(name === 'leadActor') return setCastInfo({...castInfo,leadActor:checked})
    setCastInfo({...castInfo,[name]:value})
  }

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile })
    // console.log(profile)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { profile, roleAs } = castInfo
    if(!profile.name) return updateNotification('error','Cast Profile is missing!')
    if(!roleAs.trim()) return updateNotification('error','Cast role is missing!')
    onSubmit(castInfo)
    setCastInfo({...defaultCastInfo,profile:{name:''}})
    resetSearch();
    setProfiles([]);
  }

  const handleProfileChange = (e) => {
    const {profile} = castInfo;
    profile.name = e.target.value;
    setCastInfo({...castInfo,...profile})
    // console.log(profile)
    handleSearch(searchActor, e.target.value,setProfiles)
  }

  // useEffect((e) => {
  //   const { profile } = castInfo;
  //   profile.name = e.target.value;
  //   setCastInfo({ ...castInfo, ...profile })
  // },[])

  const {leadActor,profile,roleAs} = castInfo
  return (
    <div className='flex items-center space-x-2'>
      <input type="checkbox" name="leadActor" className='w-6 h-6' checked={leadActor} onChange={handleOnChange} title='Set as lead actor' />
      <LiveSearch placeholder='Search Profile' value={profile.name} results={profiles} onSelect={handleProfileSelect} renderItem={renderItem} onChange={handleProfileChange}/>
      <span className='dark:text-dark-subtle text-light-subtle font-semibold'>as</span>
      <div className='flex-grow'>
        <input type="text" name='roleAs' className={commonInputClasses + " rounded p-1 text-lg border-2"} placeholder='Role as' value={roleAs} onChange={handleOnChange} />
      </div>
      
      <button onClick={handleSubmit} type='button' className='bg-secondary  dark:bg-white dark:text-primary w-12 h-8  text-white p-1 rounded'>Add</button>
    </div>
  )
}

export default CastForm
