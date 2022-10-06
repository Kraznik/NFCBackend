var Hunt = require("../models").Hunt
var huntEvent = require("../models").huntEvent

module.exports = async function(req,res){

    let {eventId,email,walletAddress} = req.body;

    var event = await huntEvent.findAll({where:{uuid:eventId}});

    if(!event.length)
    {
        res.send({error: "No Event Found"});
        return;
    }

    var parts = {data:0}

    for(i=0; i<event[0].data.length-1; i++)
    {
        parts["part"+(i+1)] = false;
    }

    ticketId = "CM_"+email.slice(0, 5);

    var post = await Hunt.create({
        eventUUID:eventId,
        email,
        walletAddress,
        ticketId:ticketId,
        data:parts
    })

   
    res.json({message: "Success", ticketId: ticketId});
    return;
}