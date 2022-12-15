import React from 'react'
import Container from './user/Container';
import HeroSlideShow from './user/HeroSlideShow';
import NotVerifiedUser from './user/NotVerifiedUser';
import TopRatedMovies from './user/TopRatedMovies';
import TopRatedTVSeries from './user/TopRatedTvSeries';
import TopRatedWebSeries from './user/TopRatedWebSeries';

function Home() {
  return (
    <div className='dark:bg-primary bg-white min-h-screen'>
      <Container className=' px-2 xl:p-0 '>
        <NotVerifiedUser />
        {/* slider */}
        <HeroSlideShow />
        {/* most rated movies */}
        <div className='py-8 space-y-3'>
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>

      </Container>
    </div>
  )
}

export default Home
