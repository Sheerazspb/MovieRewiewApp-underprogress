import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"
import { useTheme } from '../hooks/themeHook'
function ThemeIcon() {
  const { toggleTheme } = useTheme();
  
  return (
    <div>
      {'dark' ?
        < BsFillMoonFill   /> : <BsFillSunFill  />}{console.log(toggleTheme.theme)}
    </div>
  )
}

export default ThemeIcon
