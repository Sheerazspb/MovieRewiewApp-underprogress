import client from "./client"

const createUser = async (userInfo) => {
  try {
    const {data} = await client.post('/signup',userInfo)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}


const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/verify-email",userInfo)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}
const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/signin",userInfo)
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(error.response.data.error)
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}
const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/isauth",{
      headers: {Authorization: 'Bearer ' + token,
      accept: 'application/json',
      }
    })
    // console.log(data)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}
const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/forget-password",{email})
    // console.log(data)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}
const forgetPasswordStatus = async (token,userId) => {
  try {
    const { data } = await client.post("/forget-password-status",{token,userId})
    // console.log(data)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}
const resetPassword = async (passwordResetData) => {
  try {
    const { data } = await client.post("/reset-password", passwordResetData)
    // console.log(data)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}
const resendEmailVerificationToken = async (userId) => {
  try {
    const { data } = await client.post("/resend-email-verification-token", {userId})
    console.log("data",data)
    return data;
  } catch (error) {
    const {response} = error;
    if(response?.data) return response.data;
    return {error:error.message || error}
  }
}

export { createUser, verifyUserEmail, signInUser, getIsAuth, forgetPassword, forgetPasswordStatus, resetPassword, resendEmailVerificationToken }