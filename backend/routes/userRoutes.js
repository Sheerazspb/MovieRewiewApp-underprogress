import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import { userValidator, validate, passwordValidator ,signInValidator} from '../middlewares/validator.js';
import { isValidPassResetToken } from '../middlewares/passResetVerifyToken.js';
import { isAuth } from '../middlewares/isAuth.js';


// Public Routes
router.get("/", UserController.home);
// router.get("/registration", UserController.registration);
// router.post("/registration",userValidator,validate, UserController.userRegistration);
router.post("/signup",userValidator,validate, UserController.userRegistration);
router.post("/signin", signInValidator,validate, UserController.signIn);
router.post("/verify-email", UserController.emailVerify);
router.post("/resend-email-verification-token", UserController.resendEmailVerificationToken);
// router.post("/reset-password", UserController.forgetPassword);
router.post("/forget-password", UserController.forgetPassword);
router.post("/forget-password-status", isValidPassResetToken, UserController.forgetPsswordStatus);
router.post("/reset-password", isValidPassResetToken, passwordValidator, validate, UserController.resetPassword);

router.get("/isauth",isAuth,(req,res) => {
  const {user} = req
  res.json({ user: { id: user._id, name: user.name, email: user.email, isVerified: user.isVerified, role: user.role } })
});
// router.post("/login", UserController.userLogin);

// Protected Routes

export default router;