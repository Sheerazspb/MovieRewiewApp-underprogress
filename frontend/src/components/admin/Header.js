import React, { useState } from 'react'
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/themeHook'
import AppSearchForm from '../form/AppSearchForm';

function Header({ onAddMovieClick, onAddActorClick }) {
  const [showOptions, setShowOptions] = useState(false);
  const navigate =  useNavigate()
  const options = [
    { title: 'Add Movie', onClick: onAddMovieClick },
    { title: 'Add Actor', onClick: onAddActorClick },
  ]
  // useEffect(() => {
  //   const handleClose = () => {
  //     // if (showOptions === false) {
  //       setShowOptions(!showOptions)

  //     // }
  //     console.log("click")
  //   }
  //   document.addEventListener('click', handleClose)

  //   return () => {
  //     document.removeEventListener('click', handleClose)
  //   }

  // }, [showOptions]);
  // let imgicon = localStorage.getItem("iconImg")
  // console.log(imgicon);
  let imgIcon = localStorage.getItem("iconImg")
  let defColor = localStorage.getItem("iconColor")
  // if (imgIcon === 'fa-moon') {
  //   defColor = "text-secondary"
  // }
  // if (imgIcon === 'fa-sun') {
  //   defColor = "text-yellow-400"
  // }


  const { toggleTheme } = useTheme()

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;
    navigate("/search-movies?title=" + query)

  }

  return (
    <div className='flex items-center justify-between relative p-5 bg-secondary shadow-sm'>
      <AppSearchForm placeholder='Search Movies...' onSubmit={handleSearchSubmit} classes='border-2 border-dark-subtle  focus:border-white text-white  transition bg-transparent rounded text-lg outline-none p-1' />
      {/* <input type="text" className='border-2 border-dark-subtle  focus:border-white text-white  transition bg-transparent rounded text-lg outline-none p-1' placeholder='Search Movies...' /> */}

      <div className='flex items-center space-x-3'>
        <button onClick={toggleTheme} className="mt-1 rounded-md w-8 h-8 text-xl hover:text-2xl transition-all duration-300">
          {/* {localStorage.getItem("iconImg")} */}
          <i id='btn' className={`fa-solid ${imgIcon} ${defColor}`}></i>
        </button>
        <div onMouseLeave={() => (setShowOptions(false))} className='flex py-1'>
        <button
          onMouseEnter={() => (setShowOptions(true))} 
          // onMouseLeave={() => (setShowOptions(false))}
        // onClick={() => (setShowOptions(!showOptions))} 
        className='flex items-center space-x-2  hover:opacity-70 transition font-semibold border-2 rounded text-lg px-3 py-1 border-dark-subtle  text-dark-subtle '>
          <span>Create</span>
            <IoMdArrowDropdownCircle size={24} />
        </button>

        {showOptions && <CreateOptions visible={showOptions} options={options}/>}

        </div>
      </div>
    </div>
  )
}



const CreateOptions = ({ options, visible}) => {

  // if (!visible) return null;
  return (<div  className={"absolute right-5 top-16 z-50 flex flex-col space-y-3 p-4 bg-secondary  drop-shadow-xl rounded animate-scale" }>
    {options.map(({ title, onClick }) => {
      return <Option key={title} onClick={onClick}>{title}</Option>
    })}
  </div>
  );
};
const Option = ({ children, onClick }) => {
  return <button onClick={onClick} className='text-white  hover:opacity-70 transition'>{children}</button>
}

export default Header;

// function Dashboard() {
//   const [showOptions, setShowOptions] = useState(false);
//   const { toggleTheme } = useTheme()
//   return (
//     <div className='flex items-center justify-between relative'>
//       <input type="text" className='border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white dark:text-white focus:border-primary transition bg-transparent rounded text-lg outline-none p-1' placeholder='Search Movies...' />

//       <div className='flex items-center space-x-3'>
//         <button id='btn' onClick={toggleTheme} className="bg-dark-subtle  mt-1 rounded-md w-8 h-8"></button>
//         <button onClick={() => setShowOptions(true)} className='flex items-center space-x-2  hover:opacity-70 transition font-semibold border-2 rounded text-lg px-3 py-1 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle'>
//           <span>Create</span>
//           <AiOutlinePlus />
//         </button>
//         <CreateOptions visible={showOptions} onClose={() => setShowOptions(false)} />
//       </div>
//     </div>
//   )
// }
// const CreateOptions = ({ visible, onClose }) => {
//   const container = useRef()
//   useEffect(() => {
//     const handleClose = (e) => {
//       if (!visible) return;
//       container.current.classList.remove('animate-scale')
//       container.current.classList.add('animate-scale-revrese')
//       console.log(container.current)
//     }
//     document.addEventListener('click', handleClose)
//     return () => {
//       document.removeEventListener('click', handleClose)
//     }
//   }, [visible])

//   if (!visible) return null;
//   return (<div ref={container} className='absolute right-0 top-12 flex flex-col space-y-3 p-4 dark:bg-secondary bg-white drop-shadow-xl rounded animate-scale' onAnimationEnd={(e) => {
//     if (e.target.classList.contains('animate-scale-revrese')) onClose();
//     e.target.classList.remove('animate-scale')
//   }}>
//     <Option>Add Movie</Option>
//     <Option>Add Actor</Option>
//   </div>
//   );
// };
// const Option = ({ children, onClick }) => {
//   return <button onClick={onClick} className='dark:text-white text-secondary hover:opacity-70 transition'>{children}</button>
// }

