import React,{createContext,useEffect} from 'react';
// import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs"

const ThemeContext = createContext();
const defaultTheme = 'light' 
const darkTheme = 'dark'
// const defaultIcon = `<i  class="fa-solid fa-sun text-2xl text-yellow-400"></i>`
// const darkIcon = `<i class="fa-solid fa-moon text-2xl text-secondary"></i>`
const defaultIcon = "fa-sun"
const darkIcon = "fa-moon"
const defaultColor = "text-yellow-400"
const darkColor = "text-white"

function ThemeProvider({children}) {
  const toggleTheme = () => {
    const oldTheme = localStorage.getItem("theme");
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    const oldIcon = localStorage.getItem("iconImg");
    const newIcon = oldIcon === darkIcon ? defaultIcon : darkIcon;
    const oldColor = localStorage.getItem("iconColor");
    const newColor = oldColor === darkColor ? defaultColor : darkColor;
    
    document.documentElement.classList.remove(oldTheme)
    document.getElementById("btn").classList.remove(oldIcon);
    document.getElementById("btn").classList.remove(oldColor);
    document.documentElement.classList.add(newTheme)
    document.getElementById("btn").classList.add(newIcon)
    document.getElementById("btn").classList.add(newColor)
    // document.getElementById("btn").classList.remove("text-secondary")
    // document.getElementById("btn").classList.add("text-yellow-400")
    localStorage.setItem("iconImg",newIcon)
    localStorage.setItem("theme",newTheme)
    localStorage.setItem("iconColor",newColor)
    
  }
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const iconimage = localStorage.getItem("iconImg");
    const iconCol = localStorage.getItem("iconColor");
    // console.log("ele", iconimage)
    if (!theme) {
      document.documentElement.classList.add(defaultTheme)
      localStorage.setItem("theme", defaultTheme)
      localStorage.setItem("iconImg", darkIcon)
      localStorage.setItem("iconColor", darkColor)
      document.getElementById("btn").classList.add(darkIcon)
      // document.getElementById("btn").classList.remove("text-yellow-400")
      document.getElementById("btn").classList.add(darkColor)
    } else {
      document.documentElement.classList.add(theme)
      document.getElementById("btn").classList.add(iconimage)
      document.getElementById("btn").classList.add(iconCol)
      // if(theme === 'dark'){
      //   document.getElementById("btn").classList.remove("text-secondary")
      //   document.getElementById("btn").classList.add("text-yellow-400")
      // }
      // if(theme === 'light'){
      //   document.getElementById("btn").classList.remove("text-yellow-400")
      //   document.getElementById("btn").classList.add("text-secondary")
      // }
} 
   },[])
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeProvider,ThemeContext}
