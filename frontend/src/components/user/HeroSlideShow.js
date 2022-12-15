import React,{useState,useEffect,useRef} from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { getLatestUploads } from '../../api/movie'
import { useNotification } from '../../hooks/themeHook'

let count = 0;
let intervalId;

function HeroSlideShow() {

  const [slide,setSlide] = useState({})
  const [clonedSlide,setClonedSlide] = useState({})
  const [movies,setMovies] = useState([])
  const [upNext,setUpNext] = useState([])
  const [visible,setVisible] = useState(true)
  // const [currentIndex,setCurrentIndex] = useState(0)
  const { updateNotification } = useNotification()
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const fetchLatestUploads = async () => {
    const {error,movies} = await getLatestUploads()
    if(error) return updateNotification('error',error)
    setMovies([...movies])
    setSlide(movies[0])
  }

  const startSlideShow = () => {
   intervalId =   setInterval(onNextClick,3000);
  }
  const stopSlideShow = () => {
    clearInterval(intervalId)
  }
  
  const updateUpNext= (currentIndex) => {
    if(!movies.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3;
    let newSlides = [...movies]
    newSlides = newSlides.slice(upNextCount,end)
    if (!newSlides.length) {
      newSlides = [...movies].slice(0,3)
    }
   setUpNext([...newSlides])
  }

   const onNextClick = () => {
    stopSlideShow();
    setClonedSlide(movies[count]) 
    count = (count + 1) % movies.length
    setSlide(movies[count])
    // setCurrentIndex(count)
    clonedSlideRef.current.classList.add('slide-out-to-left')
    slideRef.current.classList.add('slide-in-from-right')
    updateUpNext(count)
  }  
  const onPrevClick = () => {
    stopSlideShow();
    setClonedSlide(movies[count]) 
    count = (count + movies.length - 1) % movies.length;
    setSlide(movies[count])
    // setCurrentIndex(count)
    clonedSlideRef.current.classList.add('slide-out-to-right')
    slideRef.current.classList.add('slide-in-from-left')
    updateUpNext(count)
  }  
  const handleAnimationEnd = () => {
    slideRef.current.classList.remove('slide-in-from-right')
    slideRef.current.classList.remove('slide-in-from-left')
    clonedSlideRef.current.classList.remove('slide-out-to-left')
    clonedSlideRef.current.classList.remove('slide-out-to-right')
    setClonedSlide({poster:slide.poster})
    startSlideShow()
  } 

  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState
    if (visibility === 'hidden') setVisible(false)
    if (visibility === 'visible') setVisible(true)
  } 

  useEffect(() => {
    fetchLatestUploads()
    document.addEventListener('visibilitychange', handleOnVisibilityChange )
    return () => {
      stopSlideShow();
      document.removeEventListener('visibilitychange', handleOnVisibilityChange)
    }
    // eslint-disable-next-line
  },[])

  useEffect(() => {
    if (movies.length && visible) {
      startSlideShow()
      updateUpNext(count)
      }else stopSlideShow();
    // eslint-disable-next-line
  }, [movies.length,visible])

  return (
    <div className='flex w-full'>
      <div className='w-[80%] aspect-video relative overflow-hidden'>

        <Link to={'/movie/single-movie/'+slide._id} className='w-full h-full cursor-pointer'>
        <img ref={slideRef} src={slide.poster} className='w-[40%] h-full m-auto' alt="" />
          <div className='absolute bottom-0  flex flex-col justify-end  py-3 z-50 bg-gradient-to-t from-white dark:from-primary '>
            <h1 className='lg:font-semibold lg:text-4xl dark:text-highlight-dark text-highlight'>{slide.title}</h1>
          </div>
        {/* </div> */}
         <img onAnimationEnd={handleAnimationEnd} ref={clonedSlideRef} src={clonedSlide.poster} className='w-[40%] h-full   m-auto absolute inset-0' alt="" />
     </Link>
       

        <div className='absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-[5%]'>

          {/* {currentIndex === 0 ? <button onClick={onPrevClick} className='bg-primary rounded border-2 outline-none p-2 text-xl text-white disabled:opacity-[50%]' type='button' disabled><AiOutlineDoubleLeft/></button> : 
            <button onClick={onPrevClick} className='bg-primary rounded border-2 outline-none p-2 text-lg text-white disabled:opacity-[50%]' type='button'><AiOutlineDoubleLeft /></button>
          } */}
          <button onClick={onPrevClick} className='bg-primary rounded border-2 outline-none p-2 text-xl text-white ' type='button'><AiOutlineDoubleLeft /></button>

          {/* {(currentIndex + 1) >= movies.length  ? <button onClick={onNextClick} className='bg-primary rounded border-2 outline-none p-2 text-xl text-white disabled:opacity-[50%]' type='button' disabled><AiOutlineDoubleRight/></button> :
            <button onClick={onNextClick} className='bg-primary rounded border-2 outline-none p-2 text-xl text-white disabled:opacity-[50%]' type='button'><AiOutlineDoubleRight /></button>
          } */}
          <button onClick={onNextClick} className='bg-primary rounded border-2 outline-none p-2 text-xl text-white ' type='button'><AiOutlineDoubleRight /></button>

        </div>
      </div>
      <div className='w-[20%] space-y-3 px-3'>
        <h1 className='font-semibold text-2xl text-primary dark:text-white text-center'>
          Up Next
        </h1>
        {upNext.map(({poster,_id}) => {
          return <img key={_id} src={poster} alt="" className='w-[55%] h-[30%] m-auto rounded'/>
        })}
      </div>
      
    </div>
  )
}

export default HeroSlideShow
