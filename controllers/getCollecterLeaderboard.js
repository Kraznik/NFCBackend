var devconCollectors = require("../models").devconCollectors;

const {Op} = require("sequelize")

module.exports = async function(req,res)
{

    var find = await devconCollectors.findAll({ order: [["count", "DESC"],["updatedAt", "ASC"]]});

    if(find.length)
    {
        res.send({data: find})
    }else{
        res.send({error: "No data in leaderboard"})
    }
    
}
