const ErrorHandler = require("../Utils/ErrorHandler")

const roleAuth =(...roles)=>{
//   console.log("this is roleAuth");
  return(req,res,next)=>{
        console.log("this is roleAuth ");

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} has no access to this resource`,401))
        }
        next();
    }
}

module.exports = roleAuth;