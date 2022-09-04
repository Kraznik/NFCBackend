const mintNfts = require("../utils/contractFunctions/mintNfts");

const claimWithNfc = async (req, res, next) => {
  try {
    var { nftTypeId, toAddress } = req.body;
    console.log(nftTypeId);
    let response = {};

    console.log("to: ", toAddress);
    await mintNfts(nftTypeId, toAddress);
    response.mintedToWallet = true;

    res.status(201).json({ response });
  } catch (error) {
    // throw error;
    return res.status(404).json({ message: "Could not airdrop the creation" });
  }
};

module.exports = claimWithNfc;
