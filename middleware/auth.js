module.exports = async function(req,res, next){
    
    if(!req.headers.validate)
    {
        res.status(401).json({error: "Not Authenticated"});
        return;
    }

    if(req.headers.validate != process.env.SECRET)
    {
        res.status(401).json({error: "Not Authenticated"});
        return;
    }

    next();
}