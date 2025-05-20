import express from 'express';
import userAuth from '../middleware/authmiddleware.js';
import { 
    register, 
    login, 
    logout, 
    verifyOtp, 
    verifyEmail, 
    isAuthenticated, 
    sendResetOtp, 
    resetPassword  } from '../controllers/authController.js';
const authRouter = express();


// wenn ich post request schicke zu "/api/auth/register" path soll  resgiter controller reagieren!
authRouter.post('/register', register)
authRouter.post('/login', login )
authRouter.post('/logout', logout )
authRouter.post('/send-verify-otp', userAuth, verifyOtp )
authRouter.post('/verify-email', userAuth ,verifyEmail )
authRouter.get ('/is-auth', userAuth, isAuthenticated)
authRouter.post('/send-reset-otp', sendResetOtp)
authRouter.post('/reset-password', resetPassword)


/*
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
*/


export default authRouter;
