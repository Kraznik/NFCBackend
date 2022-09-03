var NfcCollection = require("../models").NfcCollection
module.exports = async function(req,res)
{

    let {id} = req.params;

    var find = await NfcCollection.findAll({where: {nfcId: id}});

    if(find.length)
    {
        res.send({data: find[0]})
    }else{
        res.send({error: "NFC Not Found"})
    }
    
}
