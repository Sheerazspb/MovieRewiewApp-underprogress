import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleMovie } from '../../api/movie'
import { useNotification } from '../../hooks/themeHook'
import RatingStar from '../RatingStar'
import Container from './Container'

const convertReviewCount = (count) => {
  if (count <= 999) return count;
  return parseFloat(count / 1000).toFixed(2) + 'k'
}

function SingleMovie() {
  const [ready, setReady] = useState(false)
  const [movie, setMovie] = useState({})
  const { updateNotification } = useNotification();
  const { movieId } = useParams()

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId)
    if (error) return updateNotification('error', error)
    setReady(true)
    setMovie(movie)
  }

  useEffect(() => {
    if (movieId) fetchMovie()
    // eslint-disable-next-line 
  }, [movieId])

  if (!ready)
    return (
      <div className='h-screen flex justify-center items-center bg-white dark:bg-primary'>
        <p className='text-light-subtle dark:text-dark-subtle  animate-pulse text-3xl'>Please wait</p>
      </div>
    )

  const { trailer, storyLine, title, director, writers, reviews, cast, language, releseDate, genres, type } = movie

  return (
    <div className=' bg-white dark:bg-primary flex flex-col min-h-screen pb-10'>
      <Container className=' py-5'>
        <div className='m-auto w-[600px]'>
          <video controls src={trailer} className=''>{/* autoPlay */}</video>
          <div className='flex justify-between  '>
            <h1 className='text-3xl text-highlight dark:text-highlight-dark font-semibold py-3'>
              {title}
            </h1>
            <div className='flex flex-col items-end text-sm'>
              <RatingStar rating={reviews.ratingAvg} />
              <Link to={'/review/get-reviews-by-movie/' + movieId} className='text-highlight dark:text-highlight-dark hover:underline'>
                {convertReviewCount(reviews.reviewCount)} Reviews
              </Link>
              <button className='text-highlight dark:text-highlight-dark hover:underline' type='button'>Rate the Movie</button>
            </div>
          </div>
        </div>

        <div className='mt-5 space-y-2'>
          <p className='text-light-subtle dark:text-dark-subtle'>{storyLine}</p>


          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Casts:</p>
            {cast.map((c) => {
              return <p key={c.profile._id} className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>{c.profile.name}</p>
            })}
          </div>

          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Director:</p>
            <p className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>{director.name}</p>
          </div>


          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Writers:</p>
            {writers.map((w) => {
              return <p key={w._id} className='text-highlight dark:text-highlight-dark hover:underline cursor-pointer'>{w.name}</p>
            })}
          </div>

          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Language:</p>
            <p className='text-highlight dark:text-highlight-dark'>{language}</p>
          </div>
          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Release Date:</p>
            <p className='text-highlight dark:text-highlight-dark'>{releseDate.split('T')[0]}</p>
          </div>
          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Genres:</p>
            {genres.map((g) => {
              return <p key={g} className='text-highlight dark:text-highlight-dark'>{g}</p>
            })}
          </div>
          <div className='flex space-x-2'>
            <p className='text-light-subtle dark:text-dark-subtle font-semibold'>Type:</p>
            <p className='text-highlight dark:text-highlight-dark'>{type}</p>
          </div>

        </div>
        <div className='mt-1'>
          <h1 className='text-highlight dark:text-highlight-dark mb-2 text-2xl'>Actors:</h1>
          <div className='grid grid-cols-10'>
            {cast.map((c) => {
              return <div key={c.profile._id} className='flex items-center flex-col'>
                <img src={c.profile.avatar.url} alt='' className='w-20 h-20 aspect-square object-cover rounded-full' />
                <p className='text-highlight dark:text-highlight-dark text-sm hover:underline cursor-pointer'>{c.profile.name}</p>
                <p className='text-light-subtle dark:text-dark-subtle text-sm'>{c.roleAs}</p>
              </div>
            })}
          </div>
        </div>



      </Container>
    </div>
  )
}

export default SingleMovie
