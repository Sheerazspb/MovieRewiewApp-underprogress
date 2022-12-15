
const sendError = (res,error,statusCode = 401) => {
  res.status(statusCode).json({ error });
}

const handleNotFound = (req,res) => {
  sendError(res, 'Not Found', 404)
}

export { sendError, handleNotFound }