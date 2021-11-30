const errorHandlerMiddleware = (error, req, res, ) => {
  console.log(error.message)
   res.status(500).send({ msg: error.message})
   
}

export {errorHandlerMiddleware}