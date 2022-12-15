import React,{useState} from 'react'
import { forgetPassword } from '../../api/auth'
import { useNotification } from '../../hooks/themeHook'
import { commonModelClasses } from '../../utils/theme'
import CustomLinks from '../CustomLinks'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import Title from '../form/Title'

function ForgetPassword() {
  const [email,setEmail] = useState('')
  const { updateNotification } = useNotification();
  
  const handleChange = (e) => {
    const { value } = e.target
    setEmail( value )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.trim()) return updateNotification("error", 'Email is missing')
    if (!isValidEmail.test(email)) return updateNotification("error", 'Invalid email')
    const {error,message} = await forgetPassword(email);
    if (error) return updateNotification("error", error)
    updateNotification("success", message)

  }


  return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto">
        <form onSubmit={handleSubmit} className={commonModelClasses + ' w-96'}>
          <Title>Please Enter Your Email</Title>
          <FormInput onChange={handleChange} value={email} label="Email" placeholder="John@mail.ru" name="email" />
          <SubmitBtn value="Send Link" />
          <div className="flex justify-between">
            <CustomLinks to={"/signin"}>Sign in</CustomLinks>
            <CustomLinks to={"/signup"}>Sign up</CustomLinks>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
