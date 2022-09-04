require("hardhat");
const buyLazyMint = require("../utils/contractFunctions/buyLazyMint");
const mintNfts = require("../utils/contractFunctions/mintNfts");

const mintNfcCreation = async (req, res, next) => {
  try {
    var { collabAddress, nftTypeId, params } = req.body;
    console.log(nftTypeId);
    let response = {};

    // one buy lazy mint to nfc creator wallet i.e. creator
    await buyLazyMint(nftTypeId, params);
    response.mintedToNfcCreator = true;

    var toAddress = collabAddress;
    console.log("to: ", toAddress);
    await mintNfts(nftTypeId, toAddress);
    response.mintedToCollaborator = true;

    res.status(201).json({ response });
  } catch (error) {
    // throw error;
    return res.status(404).json({ message: "Could not mint the ethcc moment" });
  }
};

module.exports = mintNfcCreation;
