const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error.message)
   res.status(500).send({ msg: 'Something went wrong, please try again' })
   next(); 
}

export {errorHandlerMiddleware}