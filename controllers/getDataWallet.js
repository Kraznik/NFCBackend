var devconCreations = require("../models").devconCreations;

module.exports = async function(req,res)
{

    let {id} = req.params;

    var find = await devconCreations.findAll({where: {walletAddress: id}});

    if(find.length)
    {
        res.send({data: find})
    }else{
        res.send({error: "Wallet Not Found"})
    }
    
}
