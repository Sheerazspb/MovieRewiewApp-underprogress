import React, { useState,useEffect } from 'react'
import { searchActor } from '../api/actor';
import { useSearch } from '../hooks/themeHook';
import { renderItem } from '../utils/helper';
import LiveSearch from './LiveSearch'

function DirectorSelector({onSelect,directorValue}) {
  const [value,setValue] = useState("");
  const [profiles,setProfiles] = useState([]);

  const {handleSearch,resetSearch} = useSearch()

  const handleOnChange = (e) => {
    setValue(e.target.value)
    handleSearch(searchActor, e.target.value,setProfiles)
  } 
  const handleOnSelect = (profile) => {
    setValue(profile.name)
    onSelect(profile)
    setProfiles([])
    resetSearch()
  } 

  useEffect(() => {
    if (directorValue.name) setValue(directorValue.name)
  }, [directorValue])

  return (
    <div>
      <label htmlFor="director" className="dark:text-dark-subtle text-light-subtle font-semibold">Director</label>
      <LiveSearch name='director' value={value} placeholder='Search Profile' results={profiles} renderItem={renderItem} onSelect={handleOnSelect} onChange={handleOnChange}  autocomplete='off' />
    </div>

  )
}

export default DirectorSelector
