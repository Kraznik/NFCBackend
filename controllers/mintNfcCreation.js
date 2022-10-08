const buyLazyMint = require("../utils/contractFunctions/buyLazyMint");
const mintNfts = require("../utils/contractFunctions/mintNfts");

var devconCreations = require("../models").devconCreations;
var devconCollectors = require("../models").devconCollectors;


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


    var checkWallet = await devconCollectors.findAll({where:{wallet: toAddress}});

    if(checkWallet.length)
    {
      var nftTypes = checkWallet[0].nftTypeId;
      nftTypes[nftTypes.length] = nftTypeId;
      var walletcount = checkWallet[0].count + 1;
      var update = await devconCollectors.update({nftTypeId:nftTypes,count:walletcount},{where:{wallet: toAddress}});


    }else{
      var nftTypes = []
      nftTypes[0] = nftTypeId;
      var upload = await devconCollectors.create({wallet: toAddress,nftTypeId:nftTypes,count:1});
    }
    
    var checkCreation = await devconCreations.findAll({where:{nftTypeId}});

    if(checkCreation.length)
    {
      var countCreations = checkCreation[0].collected + 1;
      var updateCreation = await devconCreations.update({collected:countCreations},{where:{nftTypeId}})
    }

    res.status(201).json({ response });
  } catch (error) {
    // throw error;
    return res
      .status(404)
      .json({ message: "Could not mint the to the collaborator" });
  }
};

module.exports = mintNfcCreation;
