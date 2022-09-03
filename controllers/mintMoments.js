require("hardhat");
const buyLazyMint = require("../utils/contractFunctions/buyLazyMint");
const mintNfts = require("../utils/contractFunctions/mintNfts");

const mintMoments = async (req, res, next) => {
  try {
    var { walletAddresses, nftTypeId, params } = req.body;
    var { category } = req.params; // category will be ethcc for now in this endpoint
    // console.log(ticketIds, title, description, nftTypeId);
    console.log(nftTypeId);
    let response = {};

    // one buy lazy mint to moments wallet i.e. creator
    await buyLazyMint(nftTypeId, params, category);
    response.mintedToCreator = true;

    for (let i = 0; i < walletAddresses.length; i++) {
      var toAddress = walletAddresses[i];
      console.log("to: ", toAddress);
      await mintNfts(nftTypeId, toAddress, category); // have to add ethcc as category // added
    }
    response.mintedToAllOthers = true;

    res.status(201).json({ response });
  } catch (error) {
    // throw error;
    return res.status(404).json({ message: "Could not mint the ethcc moment" });
  }
};

module.exports = mintMoments;
