var NfcCollection = require("../models").NfcCollection

const {Op} = require("sequelize")

module.exports = async function(req,res)
{

    var find = await NfcCollection.findAll({ order: [["updatedAt", "ASC"]],where:{wallet: {[Op.ne]: null}}});

    if(find.length)
    {
        res.send({data: find})
    }else{
        res.send({error: "No data in leaderboard"})
    }
    
}
