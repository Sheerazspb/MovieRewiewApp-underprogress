import React from 'react'
import GridContainer from './GridContainer'
// import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import RatingStar from '../RatingStar';

function MovieList({title,movies=[]}) {
  if(!movies.length) return null;

  const trimTitle = (text = '') => {
    if (text.length <= 30) return text;
    return text.substring(0, 30) + '...'
  }

  return (
    <div>
      <h1 className='text-2xl dark:text-white text-secondary font-semibold mb-5'>{title}</h1>
      <GridContainer>
        {movies.map((movie) => {
          return <Link to={'/movie/single-movie/' + movie._id } className='flex items-center flex-col' key={movie._id}>
            <img className='h-[320px] w-[230px]  ' src={movie.poster} alt={movie.title} />
            <h1 className=' text-lg dark:text-white text-secondary font-semibold' title={movie.title}>{trimTitle(movie.title)}</h1>
            <RatingStar rating={movie.reviews.ratingAvg}/>
            {/* {movie.reviews.ratingAvg ? (
              <p className='flex items-center space-x-1 text-highlight dark:text-highlight-dark'>
                <span>{movie.reviews.ratingAvg}</span>
                <AiFillStar />
              </p>
            ) : (
              <p className=' text-highlight dark:text-highlight-dark '>No review</p>
            )} */}
          </Link>
        })}
      </GridContainer>
    </div>

  )
}

export default MovieList
