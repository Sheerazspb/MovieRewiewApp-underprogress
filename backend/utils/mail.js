import nodemailer from "nodemailer";

// create 6 digit otp for email verifivation
const generateOtp = (otp_length = 6) => {
  let OTP = '';
  for (let i = 1; i <= otp_length; i++) {
    const randomVal = Math.round(Math.random() * 9)
    OTP += randomVal;
  }
  return OTP;
}
// sending verification email with otp token to user mailbox
const generateMailTranporter = () => 
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.TRAP_USER,
      pass: process.env.TRAP_PASS
    }
  });


export { generateOtp, generateMailTranporter };