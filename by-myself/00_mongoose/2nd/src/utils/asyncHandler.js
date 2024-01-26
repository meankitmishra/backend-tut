const asyncHandler = (responseHandler)=>{
    (req,res,next)=>{
        Promise.resolve(req,res,next).catch(next(err))
    }

}

export { asyncHandler }