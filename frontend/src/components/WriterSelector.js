import React, { useState } from 'react'
import { searchActor } from '../api/actor';
import { useSearch } from '../hooks/themeHook';
import { renderItem } from '../utils/helper'
import LiveSearch from './LiveSearch'

function WriterSelector({ onSelect }) {

    const [value, setValue] = useState("");
    const [profiles, setProfiles] = useState([]);

    const { handleSearch, resetSearch } = useSearch()

    const handleOnChange = (e) => {
      setValue(e.target.value)
      handleSearch(searchActor, e.target.value, setProfiles)
    }
    const handleOnSelect = (profile) => {
      setValue('')
      onSelect(profile)
      setProfiles([])
      resetSearch()
    } 

  return (
    <LiveSearch name='writers' placeholder='Search Profile' results={profiles} renderItem={renderItem} onSelect={handleOnSelect} onChange={handleOnChange} value={value} />
  )
}

export default WriterSelector
