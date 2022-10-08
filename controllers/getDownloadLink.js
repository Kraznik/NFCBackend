var devconCreations = require("../models").devconCreations;

module.exports = async function(req,res)
{

    let {id} = req.params;

    var find = await devconCreations.findAll({where: {id}});

    if(find.length)
    {
        res.send({downloadLink: find[0].generatedPhotoLink})
    }else{
        res.send({error: "Sticker Not Found"})
    }
    
}
