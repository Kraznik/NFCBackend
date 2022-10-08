var devconCreations = require("../models").devconCreations;

const {Op} = require("sequelize")

module.exports = async function(req,res)
{

    var find = await devconCreations.findAll({ order: [["collected", "DESC"],["updatedAt", "ASC"]],where:{collected: {[Op.ne]: 0}}});

    if(find.length)
    {
        res.send({data: find})
    }else{
        res.send({error: "No data in leaderboard"})
    }
    
}
