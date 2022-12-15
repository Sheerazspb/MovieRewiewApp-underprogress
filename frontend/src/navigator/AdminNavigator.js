import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import NotFound from '../components/NotFound';
import Dashboard from '../components/admin/Dashboard';
import Movies from '../components/admin/Movies';
import Actors from '../components/admin/Actors';
import AdminNavbar from '../components/admin/AdminNavbar';
import Header from '../components/admin/Header';
import MovieUpload from '../components/admin/MovieUpload';
import ActorUpload from '../components/modals/ActorUpload';
import SearchMovies from '../components/admin/SearchMovies';

function AdminNavigator() {
  const [showMovieUploadModal,setShowMovieUploadModal] = useState(false)
  const [showActorUploadModal,setShowActorUploadModal] = useState(false)

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true)
  }
  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false)
  }
  const displayActorUploadModal = () => {
    setShowActorUploadModal(true)
  }
  const hideActorUploadModal = () => {
    setShowActorUploadModal(false)
  }

  return (
    <>
    <div className='flex dark:bg-primary bg-white'>
      <AdminNavbar/>
      <div className='flex-1  max-w-screen-xl'>
          <Header onAddMovieClick={displayMovieUploadModal} onAddActorClick={displayActorUploadModal}/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/movie" element={<Movies/>} />
        <Route path="/actor" element={<Actors />} />
            <Route path="/search-movies" element={<SearchMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </div>
    <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal} />
    <ActorUpload visible={showActorUploadModal} onClose={hideActorUploadModal} />
    </>
    
  )
}

export default AdminNavigator
