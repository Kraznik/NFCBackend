var NfcCollection = require("../models").NfcCollection
module.exports = async function(req,res)
{

    let {id} = req.params;

    let {nftTypeId,title,wallet} = req.body;

    var find = await NfcCollection.findAll({where: {nfcId: id}});

    try {

        if(find.length)
        {
            var update = await NfcCollection.update({nftTypeId,title,wallet},{where:{nfcId:id}})
            res.send({message: "Updated"})
            
        }else{
            res.send({error: "NFC Not Found"})
        }
        
    } catch (error) {
        console.log(error);
    }

    
    
}
