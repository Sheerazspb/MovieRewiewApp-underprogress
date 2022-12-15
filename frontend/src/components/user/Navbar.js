import React from 'react'
// import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"

import { Link } from 'react-router-dom'
import { useAuth, useTheme } from '../../hooks/themeHook'

const Navbar = () => {
  const {toggleTheme} = useTheme()
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  // localStorage.setItem("iconImg", null)

//  if (localStorage.getItem("theme" === 'light')) {
//    localStorage.setItem("iconImg", `<i class="fa-solid fa-sun"></i> `)
//       // console.log(document.getElementById("fa-solid"))
//       // document.getElementById("fa-solid").classList.add('fa-su')
//     }
//   if (localStorage.getItem("theme" === 'dark')) {
//    localStorage.setItem("iconImg", `<i class="fa-solid fa-moon"></i>` )
//       // document.getElementById("fa-solid")
//     }


  // const [iconImage,setIconImage] = useState(null)
  // if (localStorage.getItem("theme") === "dark") {
  //   setIconImage("fa-sun")
  // } else {
  //   setIconImage("fa-moon")
  // }
  // useEffect(() => {
  //   // if (localStorage.getItem("theme" === 'light')) {
  //   //   localStorage.setItem("iconImg", `<i class="fa-solid fa-sun"></i> `)
  //   //   // console.log(document.getElementById("fa-solid"))
  //   //   // document.getElementById("fa-solid").classList.add('fa-su')
  //   // }
  //   // if (localStorage.getItem("theme" === 'dark')) {
  //   //   localStorage.setItem("iconImg", `<i class="fa-solid fa-moon"></i>`)
  //   //   // document.getElementById("fa-solid")
  //   // }
    
  //   // document.getElementById("btn").innerHTML = localStorage.getItem("iconImg")
  //   // const theme = localStorage.getItem("theme")
  //   // if (theme === 'light') {
  //   //   setIconImage("fa-sun")
  //   //   document.getElementById("btn").innerHTML = `light<i class="fa-solid ${iconImage}"></i> `
  //   // } else {
  //   //   setIconImage("fa-moon")
  //   //   document.getElementById("btn").innerHTML = `dark<i class="fa-solid ${iconImage}"></i> `
  //   // }
  //   // if (localStorage.getItem("theme" === 'light')) {
  //   //   // console.log(document.getElementById("fa-solid"))
  //   //   document.getElementById("fa-solid").classList.add('fa-su')  
  //   // } else {
  //   //   document.getElementById("fa-solid").classList.add('fa-moo')
  //   //   // document.getElementById("fa-solid")
  //   // }
  // }, [])
  // console.log(classIcon)
  let imgIcon = localStorage.getItem("iconImg")
  let defColor = localStorage.getItem("iconColor")
  // const IconImage = () => {
  //   if (imgIcon === "fa-moon") {
  //     return <i id='btn' className={`fa-solid ${imgIcon} text-secondary text-xl`} size={24}></i>
  //   } else {
  //     return <i id='btn' className={`fa-solid ${imgIcon} text-yellow-400 text-xl`} size={24}></i>
  //   }
  // }

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <div className="max-w-screen-xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
          <img src="./logo.png" alt="" className="h-20"/>
          </Link>
          <ul className='flex items-center space-x-4'>
            <li>
              <button onClick={toggleTheme} className="  mt-1 rounded-md w-8 h-8 text-xl hover:text-2xl transition-all duration-300">
                {/* {localStorage.getItem("iconImg")} */}
               
                <i id='btn' className={`fa-solid ${imgIcon} ${defColor} `}></i>
                
                {/* <i className="fa-solid fa-moon"></i> */}
                 {/* <i id="fa-solid" className={`fa-solid ${iconImage}`}></i> */}
                
                </button>
            </li>
            <li>
              <input type="text" className="border-2 border-dark-subtle p-1 rounded bg-transparent  outline-none focus:border-white transition text-white" placeholder='Search..' />
            </li>
            <li>
              {isLoggedIn ? (<button onClick={handleLogout} className='text-white text-xl'>Logout</button>) : (<Link className='text-white text-2xl' to="/signin">Login</Link>)}
              </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Navbar
