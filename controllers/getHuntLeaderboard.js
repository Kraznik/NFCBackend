var Hunt = require("../models").Hunt;
var huntEvent = require("../models").huntEvent

module.exports = async function (req, res) {

  let{eventId} = req.params;

  var event = await huntEvent.findAll({where:{uuid:eventId}});

  var huntLead= []

  for(i=0; i<event[0].data.length; i++)
  {
    huntLead["hunt"+i] = await Hunt.findAll({
      order: [["updatedAt", "ASC"]],
      where: { data: {data:  (event[0].data.length-i)}},
    });
  }
  var arr = []

  for(i=0; i<event[0].data.length; i++)
  {
    arr = [...arr,...huntLead["hunt"+i]]
  }
  
  

  var data = {
    rank: {},
    data: arr,
  };

  if (arr.length) {
    for (i = 0; i < arr.length; i++) {
      data.rank[arr[i].ticketId] = i;
    }
  }

  res.send(data);
};
