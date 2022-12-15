import React,{useState} from 'react'
import { commonModelClasses } from '../../utils/theme'
import CustomLinks from '../CustomLinks'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import Title from '../form/Title'
import { useNotification,useAuth } from '../../hooks/themeHook'
// import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../api/auth'


const validateUserInfo = ({ email, password }) => {
  // eslint-disable-next-line
  const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.trim()) return { status: false, error: "Email is missing!" }
  if (!isValidEmail.test(email)) return { status: false, error: "Invalid email!" }

  if (!password.trim()) return { status: false, error: "Password is missing!" }
  // if (password.length < 6 || password.length > 32) return { status: false, error: "Password must be 6 to 32 chracters long!" }

  else return { status: true }
}

function Signin() {
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', password: ''})
  const { updateNotification } = useNotification();
  const {handleLogin,authInfo} = useAuth();
  const {isPending} = authInfo;
  
  // console.log(authInfo.error)

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const { status, error } = validateUserInfo(userInfo);
    if (!status) return updateNotification("error", error)
    handleLogin(userInfo.email, userInfo.password)
    const response = await signInUser(userInfo);
    if (response) return updateNotification("error", response.error);
  }
  // useEffect(()=>{
  //   if(isLoggedIn) navigate('/')
  // },[isLoggedIn,navigate])

  return (
    <div className='fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center'>
      <div className="max-w-screen-xl mx-auto">
        <form onSubmit={handleSubmit} className={commonModelClasses + ' w-96'}>
          <Title>Sign in</Title>
          <FormInput onChange={handleChange} value={userInfo.email} label="Email" placeholder="John@mail.ru" name="email" />
          <FormInput onChange={handleChange} value={userInfo.password}  label="Password" type="password" placeholder="********" name="password" />
          <SubmitBtn value="Sign in" busy={isPending}/>
          <div className="flex justify-between">
            <CustomLinks to={"/forget-password"}>Forgot Password?</CustomLinks>
            <CustomLinks to={"/signup"}>Sign up</CustomLinks>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
