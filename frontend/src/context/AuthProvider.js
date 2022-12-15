import React, { createContext, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getIsAuth, signInUser } from '../api/auth';

const AuthContext = createContext();
const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: '',
}

function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo })
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true })
    const { error, user } = await signInUser({ email, password });
    if (error) {
      // console.log(authInfo)
      return setAuthInfo({ ...authInfo, isPending: false, error })
    }
    navigate("/",{replace:true});
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: '',
    });
    localStorage.setItem('auth-token', user.token)
  };
  const isAuth = async () => {
    const token  = localStorage.getItem('auth-token')
    if(!token) return;
    setAuthInfo({ ...authInfo, isPending: true })
    const {error,user} = await getIsAuth(token)
    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error })
    }
    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: '',
    });
  }
  
  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    setAuthInfo({...defaultAuthInfo});
  }

  useEffect(() => {
    isAuth()
    // eslint-disable-next-line
  },[])
  
  return (
    <AuthContext.Provider value={{ authInfo, handleLogin, isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
