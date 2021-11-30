const asyncWrapper = (func)=>{

    return async(req,res,next)=>{
        try {
            await func(req,res,next);
        } catch (error) {
            res.status(501).json(error.message)
            // next(error)
        }
       
    }
}

export {asyncWrapper}