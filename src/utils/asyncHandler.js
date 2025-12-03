
// higher order function or we are also called that wrapper function

/*
const asyncHandler=(fn)=>{
    async (req,res,send)=>{
        try {
            await fn(req,res,send)
        } catch (error) {
            res.status(error.code || 500).json({
                success : false,
                message:err.message
            })
        }
    }
}
*/

// by using promises

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>{next(err)})
    }
}

export default asyncHandler;