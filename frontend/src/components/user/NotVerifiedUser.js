import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/themeHook';

function NotVerifiedUser() {
  
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigate = useNavigate()
  const navigateToVerification = () => {
    navigate('/verify-email', { state: { user: authInfo.profile } })
  }

  return (
    <div className='fixed inset-0 dark:bg-primary bg-light -z-10 flex flex-col justify-between  items-center'>
      {isLoggedIn && !isVerified ? (<div  className="flex mt-28">
        {/* <p className="ring-2 ring-pink-500 ring-offset-8 ring-offset-pink-100 text-gray-700 text-center  bg-pink-300 p-2 w-96"><svg class="inline text-pink-700 flex-shrink-0 mr-2 mb-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>Account is not Verified, <button onClick={navigateToVerification} className="text-indigo-600 font-semibold hover:underline">Click here!</button> </p> */}
        {/* <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
          <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
            <div>
              <button onClick={navigateToVerification} className="text-blue-500 font-semibold hover:underline">Click here to verify.</button>
              <p class="text-sm">Hi<span className='text-blue-500'> {authInfo.profile.name} </span>,Please verify to have all advantages.</p>
            </div>
          </div>
        </div> */}
        <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
          <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
            <div>
              <p class="font-bold">Account is not verified</p>
              <p class="text-sm">Hi<span className='font-semibold text-blue-500'> {authInfo.profile.name} </span>to verify account & get all advantages of the movie app,Please <button onClick={navigateToVerification} className="text-blue-500  font-semibold hover:underline">Click here</button> </p>
            </div>
          </div>
        </div>
      </div>) : null}
    </div>
  )
}

export default NotVerifiedUser
