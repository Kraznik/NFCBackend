const config = require("../config");
const mintNfts = require("../utils/contractFunctions/mintNfts");
var Hunt = require("../models").Hunt;
var huntEvent = require("../models").huntEvent;

const mintHuntToken = async (req, res) => {
  try {
    let { eventId } = req.params;
    var { ticketId } = req.body; // huntId = 1|2|3
    var toAddress = ticketId;
    console.log("to: ", toAddress);

    // res.status(201).json({ response });
    var event = await huntEvent.findAll({ where: { uuid: eventId } });

    if (!event.length) {
      res.send({ error: "No Event Found" });
      return;
    }

    var hunt = await Hunt.findAll({
      where: { eventUUID: eventId, ticketId: ticketId },
    });

    if (hunt.length) {
      var updateData = hunt[0].data;

      for (i = 0; i < event[0].data.length - 1; i++) {
        if (req.body["part" + (i + 1)]) {
          const nftTypeId = config.hunts.murals[i + 1];
          await mintNfts(nftTypeId, toAddress);
          updateData["part" + (i + 1)] = req.body["part" + (i + 1)];
        }
      }

      var update = await Hunt.update(
        { data: updateData },
        { where: { eventUUID: eventId, ticketId: ticketId } }
      );

      var huntInfo = await Hunt.findAll({
        where: { eventUUID: eventId, ticketId: ticketId },
      });

      var count = 0;

      for (i = 0; i < event[0].data.length - 1; i++) {
        if (huntInfo[0].data["part" + (i + 1)]) {
          count++;
        }
      }

      updateData = huntInfo[0].data;

      updateData.data = count;

      var update = await Hunt.update(
        { data: updateData },
        { where: { eventUUID: eventId, ticketId: ticketId } }
      );

      if (update) {
        data = {
          message: "Updated",
        };
      } else {
        data = {
          message: "Something Went Wrong",
        };
      }
    } else {
      data = {
        message: "TicketId Not found",
      };
    }

    res.json(data);
    return;
  } catch (error) {
    // throw error;
    return res
      .status(404)
      .json({ message: "Could not mint nft to the hunter" });
  }
};

module.exports = mintHuntToken;
