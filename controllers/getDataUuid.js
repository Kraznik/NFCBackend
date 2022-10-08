var devconCreations = require("../models").devconCreations;

module.exports = async function(req,res)
{

    let {id} = req.params;

    var find = await devconCreations.findAll({where: {uuid: id}});

    if(find.length)
    {
        res.send({data: find[0]})
    }else{
        res.send({error: "Uuid Not Found"})
    }
    
}
