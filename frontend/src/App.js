import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Home from './components/Home'
import Navbar from './components/user/Navbar';
import VerifyEmail from './components/auth/VerifyEmail';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmForgetPassword from './components/auth/ConfirmForgetPassword';
import NotFound from './components/NotFound';
import { useAuth } from './hooks/themeHook';
import AdminNavigator from './navigator/AdminNavigator';
import SingleMovie from './components/user/SingleMovie';


function App() {
  const { authInfo } = useAuth();
  const isAdmin = authInfo.profile?.role === 'admin';
  if (isAdmin) return <AdminNavigator />

  return (
    <>
      {/* <BrowserRouter> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password-status" element={<ConfirmForgetPassword />} />
        <Route path="/reset-password" element={<resetPassword />} />
        <Route path="/movie/single-movie/:movieId" element={<SingleMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
