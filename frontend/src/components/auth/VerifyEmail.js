import React, { useState, useRef, useEffect } from 'react'
import { commonModelClasses } from '../../utils/theme';
import SubmitBtn from '../form/SubmitBtn'
import Title from '../form/Title'
import { useLocation, useNavigate } from 'react-router-dom';
import { resendEmailVerificationToken, verifyUserEmail } from '../../api/auth';
import { useNotification, useAuth } from '../../hooks/themeHook'

const OTP_LENGTH = 6;

const isValidOtp = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val))
    if (!valid) break;
  }
  return valid
}

function VerifyEmail() {
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef();
  const { updateNotification } = useNotification();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;
  // console.log(user)
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1)
  }
  const focusPrevInputField = (index) => {
    // console.log('focusPrevInputField',index)
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex)
  }
  const handleOtpChange = (e, index) => {
    const { value } = e.target
    const newOtp = [...otp]
    newOtp[index] = value.substr(value.length - 1, value.length);
    if (!value) {
      focusPrevInputField(index)
    } else {
      focusNextInputField(index);
    }
    setOtp([...newOtp])
  }
  // const handleOtpResend = async () => {
  //   const { error, message } = await resendEmailVerificationToken(user.id)
  //   if (error) return updateNotification('error', error);
  //   updateNotification('success', message);
  // }

  const handleKeyDown = (e, index) => {
    // console.log(e.key)
    if (e.key === 'Backspace' && (!e.target.value)) {
      focusPrevInputField(index)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOtp(otp)) return updateNotification('error', 'Invalid OTP');
    const { error, message, user: userResponse } = await verifyUserEmail({ userId: user.id, OTP: otp.join('') })
    if (error) return updateNotification('error', error);
    updateNotification('success', message);
    localStorage.setItem('auth-token', userResponse.token)
    isAuth();
  }

  const handleOtpResend = async () => {
    console.log(user.id)
    const { error, message } = await resendEmailVerificationToken(user.id)
    if (error) return updateNotification('error', error);
    updateNotification('success', message);
  }

  useEffect(() => {
    inputRef.current?.focus()
    // console.log(inputRef.current)
  }, [activeOtpIndex])

  useEffect(() => {
    if (!user) navigate('/not-found')
    if (isLoggedIn && isVerified) navigate('/')
  }, [user, navigate, isLoggedIn, isVerified])

  return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto">
        <form onSubmit={handleSubmit} className={commonModelClasses}>
          <div>
            <Title>Enter 6 digit code to verify your Account</Title>
            <p className='text-center dark:text-dark-subtle text-light-subtle'>OTP has been sent to your email</p>
          </div>
          <div className='flex justify-center items-center space-x-4'>
            {otp.map((_, index) => {
              return <input
                ref={activeOtpIndex === index ? inputRef : null}
                key={index} type="number" value={otp[index] || ''}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className='w-12 h-12  border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary text-xl' />

            })}
          </div>
          <div>
            <SubmitBtn value="Verify Account" />
            <button type='button' onClick={handleOtpResend} className='text-blue-500 font-semibold mt-3 hover:underline'>Don't have OTP?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
