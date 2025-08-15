module.exports = function logged(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    res.status(401).json({message:"Você precisa ter a sua sessão iniciada", typeMessage:"error"});

}