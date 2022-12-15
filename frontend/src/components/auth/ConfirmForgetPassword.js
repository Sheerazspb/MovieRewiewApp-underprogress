import React,{useState,useEffect} from 'react'
import { ImSpinner9 } from 'react-icons/im'
import { commonModelClasses } from '../../utils/theme'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import Title from '../form/Title'
import {useNavigate, useSearchParams} from 'react-router-dom';
import { forgetPasswordStatus, resetPassword } from '../../api/auth'
import { useNotification } from '../../hooks/themeHook'

function ConfirmForgetPassword() {
  const [passwordReset,setPasswordReset] = useState({
    password:'',
    confirmPassword:'',
  })
  const [isVerifying,setIsverifying] = useState(true)
  const [isValid,setIsValid] = useState(false)
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')
  const id = searchParams.get('id')
  const { updateNotification } = useNotification();
  const navigate = useNavigate()

  useEffect(() => {
    isValidToken()
    // eslint-disable-next-line
  },[])

  const isValidToken = async () => {
    const { error, valid } = await forgetPasswordStatus(token,id)
    // console.log("valid",valid)
    setIsverifying(false)
    if (error || !valid) { 
      setIsValid(false)
      navigate('/forget-password-status', { replace: true })
      return updateNotification('error',error)
    }
    setIsValid(true)
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
    setPasswordReset({...passwordReset,[name]:value})
    // console.log(name,value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!passwordReset.password.trim() || !passwordReset.confirmPassword.trim()) return updateNotification("error","All feilds are required!")
    if (passwordReset.password.trim().length < 6 || passwordReset.password.trim().length > 32) return updateNotification("error","Password must be 6 to 32 chracters long!")
    if (passwordReset.password.trim() !== passwordReset.confirmPassword.trim()) return updateNotification("error", "Password do not matched!")
    const {error,message} = await resetPassword({ newPassword: passwordReset.password ,userId: id,token})
    if(error) return updateNotification("error", error)
    updateNotification("success", message)
    navigate('/signin',{replace:true} )
  }
  
  if(isVerifying) return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex space-y-4 items-center justify-center flex-col">
          <ImSpinner9 className='animate-spin text-4xl   text-teal-400' />
        <h3 className='text-4xl font-semibold dark:text-white text-primary'>Be patient we are verifying your token!</h3>
         </div>
        </div>
      </div>
  )
  if(!isValid) return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex space-y-4 items-center justify-center flex-col">
          <h3 className='text-4xl font-semibold dark:text-white text-primary'>Sorry the token is invalid!</h3>
         </div>
        </div>
      </div>
  )

  return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto">
        <form onSubmit={handleSubmit} className={commonModelClasses + ' w-96'}>
          <Title>Enter New Password</Title>
          <FormInput onChange={handleChange} value={passwordReset.password} label="New Password" type="password" placeholder="********" name="password" />
          <FormInput onChange={handleChange} value={passwordReset.confirmPassword} label="Confirm New Password" type="password" placeholder="********" name="confirmPassword" />
          <SubmitBtn value="Save New Password" />
        </form>
      </div>
    </div>
  )
}

export default ConfirmForgetPassword
