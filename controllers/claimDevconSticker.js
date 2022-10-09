const mintNfts = require("../utils/contractFunctions/mintNfts");

var devconCreations = require("../models").devconCreations;
var devconCollectors = require("../models").devconCollectors;

const claimDevconSticker = async (req, res, next) => {
  try {
    var { nftTypeId, toAddress } = req.body;
    console.log(nftTypeId);
    let response = {};

    console.log("to: ", toAddress);
    await mintNfts(nftTypeId, toAddress);
    response.mintedToWallet = true;

    var checkWallet = await devconCollectors.findAll({
      where: { wallet: toAddress },
    });

    if (checkWallet.length) {
      var nftTypes = checkWallet[0].nftTypeId;
      nftTypes[nftTypes.length] = nftTypeId;
      var walletcount = checkWallet[0].count + 1;
      var update = await devconCollectors.update(
        { nftTypeId: nftTypes, count: walletcount },
        { where: { wallet: toAddress } }
      );
    } else {
      var nftTypes = [];
      nftTypes[0] = nftTypeId;
      var upload = await devconCollectors.create({
        wallet: toAddress,
        nftTypeId: nftTypes,
        count: 1,
      });
    }

    var checkCreation = await devconCreations.findAll({ where: { nftTypeId } });

    if (checkCreation.length) {
      var countCreations = checkCreation[0].collected + 1;
      var updateCreation = await devconCreations.update(
        { collected: countCreations },
        { where: { nftTypeId } }
      );
    }

    res.status(201).json({ response });
  } catch (error) {
    // throw error;
    return res.status(404).json({ message: "Could not airdrop the creation" });
  }
};

module.exports = claimDevconSticker;
