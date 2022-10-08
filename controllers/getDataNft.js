var devconCreations = require("../models").devconCreations;

module.exports = async function(req,res)
{

    let {id} = req.params;

    var find = await devconCreations.findAll({where: {nftTypeId: id}});

    if(find.length)
    {
        res.send({data: find[0]})
    }else{
        res.send({error: "Nft Type Id Not Found"})
    }
    
}
