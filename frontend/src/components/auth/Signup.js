import React, { useState,useEffect } from 'react'
import { createUser } from '../../api/auth'
import { commonModelClasses } from '../../utils/theme'
import CustomLinks from '../CustomLinks'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import Title from '../form/Title'
import { useNavigate } from 'react-router-dom';
import { useAuth, useNotification } from '../../hooks/themeHook'

const validateUserInfo = ({ name, email, password, confirmPassword }) => {
  // eslint-disable-next-line
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!name.trim()) return { status: false, error: "Name is missing!" }
  if (!/^[a-z A-Z]+$/.test(name)) return { status: false, error: "Invalid name!" }

  if (!email.trim()) return { status: false, error: "Email is missing!" }
  if (!isValidEmail.test(email)) return { status: false, error: "Invalid email!" }

  if (!password.trim()) return { status: false, error: "Password is missing!" }
  if (password.length < 6 || password.length > 32) return { status: false, error: "Password must be 6 to 32 chracters long!" }

  if (!confirmPassword.trim()) return { status: false, error: "Confirm Password is missing!" }
  if (confirmPassword.length < 6 || confirmPassword.length > 20) return { status: false, error: "Password must be 6 to 20 chracters long!" }

  if (password !== confirmPassword) return { status: false, error: "Password is not matching!" }
  else return { status: true }
}

function Signup() {
 const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const { updateNotification } = useNotification();

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
    // console.log(e.target.value,e.target.name)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = validateUserInfo(userInfo);
    if (!status) return updateNotification("error", error)
    const response = await createUser(userInfo)
    if (response.error) return updateNotification("error", response.error);
    navigate("/verify-email", {
      state: { user: response.user },
      replace: true,
    });
  }

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn, navigate])

  const { name, email, password, confirmPassword } = userInfo;
  return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto mt-20">
        <form onSubmit={handleSubmit} className={commonModelClasses + ' w-96'}>
          <Title>Sign up</Title>
          <FormInput onChange={handleChange} value={name} label="Name" placeholder="John Doe" name="name" />
          <FormInput onChange={handleChange} value={email} label="Email" placeholder="John@mail.ru" name="email" />
          <FormInput onChange={handleChange} value={password} label="Password" placeholder="********" name="password" type='password' />
          <FormInput onChange={handleChange} value={confirmPassword} label="Confirm Password" placeholder="********" name="confirmPassword" type='password' />
          <SubmitBtn value="Sign up" />
          <div className="flex justify-between">
            <CustomLinks to={"/forget-password"}>Forget Password</CustomLinks>
            <CustomLinks to={"/signin"}>Sign in</CustomLinks>
          </div>
        </form>

      </div>

    </div>
  )
}

export default Signup
