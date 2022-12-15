import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { BiMoviePlay } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
// import { FiLogOut } from 'react-icons/fi'
// import { IoMdLogOut } from 'react-icons/io'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { RiAdminLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/themeHook'

function AdminNavbar() {
  const {handleLogout} = useAuth();
  return (
    <nav className='w-48 min-h-screen bg-secondary  border-gray-300'>
      <div className='flex flex-col justify-between pl-5 h-screen sticky top-0'>
      <ul className=''>
        <li>
          <Link to='/'>
            <img src="./logo.png" alt="logo" className='h-16 ml-5 mt-3' />
          </Link>
        </li>
        <li>
          <NavItem to='/'>
            <AiOutlineHome />
            <span>Home</span>
          </NavItem>
        </li>
        <li>
          <NavItem to='/movie'>
            <BiMoviePlay />
            <span>Movies</span>
          </NavItem>
        </li>
        <li>
          <NavItem to='/actor'>
            <FaUserSecret />
            <span>Actors</span>
          </NavItem>
        </li>
      </ul>
      <div className='flex flex-col items-start pb-5 mb-5'>
        <div className='flex items-center font-semibold text-cyan-400 text-xl space-x-1 mb-3'>
          <RiAdminLine />
          <span className=''>Admin</span>
        </div>
        <button onClick={handleLogout} className='flex items-center text-red-400  text-xl   hover:opacity-70 transition space-x-1'>
          {/* <FiLogOut/> */}
          {/* <IoMdLogOut/> */}
          <RiLogoutBoxRLine />
          <span>Logout</span>
        </button>
      </div>
</div>
    </nav>
  )
}

const NavItem = ({ children, to }) => {
  const commonClasses = " flex items-center text-lg space-x-2 p-2 hover:opacity-80 mt-3";
  return (
    <NavLink className={({ isActive }) => (isActive ? 'text-white' : 'text-gray-400') + commonClasses} to={to}>
      {children}
    </NavLink>
  )
}

export default AdminNavbar;
