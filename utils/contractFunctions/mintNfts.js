const calculateGasFee = require("../calculateGasFee");
const {
  Diamond1,
  wallet1,
  Diamond2,
  wallet2,
  Diamond3,
  wallet3,
} = require("../ethereum/Diamond");

const mintNfts = async (nftTypeId, toAddress, category) => {
  if (category === "ethbcn") {
    var Diamond = Diamond1;
    var wallet = wallet1;
  } else if (category === "dogud") {
    var Diamond = Diamond2;
    var wallet = wallet2;
  } else if (category === "ethcc") {
    var Diamond = Diamond3;
    var wallet = wallet3;
  }

  const creatorTypeId = parseInt(nftTypeId.slice(-12), 16);
  const gasFees = await calculateGasFee();
  console.log(gasFees);

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  let creator = wallet.address, // wallet.address
    gallery = ZERO_ADDRESS, // "0xAEde54862c0BE447Fcac57c6cAb0EDfaa6f6697e", // final on testnet
    amount = 1,
    to = toAddress,
    expirationTime = Math.floor(+Date.UTC(2099, 0, 1) / 1000);

  console.log("creating signature...");

  console.log("creatorTypeId: ", creatorTypeId);

  try {
    const creatorSignature = await Diamond.hashMintNft(
      creator,
      creatorTypeId,
      gallery,
      amount,
      to,
      expirationTime
    );

    console.log("sig:", creatorSignature);

    //   return;

    console.log("minting edition...");

    let tx = await Diamond.mintNfts(
      creator,
      creatorTypeId, // which hunt contract // one of the 8 nft collections
      gallery, // some gallery social cause wallet address // ETH BCN SIO
      amount, // 1
      to, // get address from ticket Id
      expirationTime,
      creatorSignature,
      gasFees
    );

    console.log("Txn Hash: ", tx.hash);
    console.log("pending..");

    await tx.wait();
    console.log("Txn completed..");
  } catch (err) {
    console.error(err);
  }
};

module.exports = mintNfts;
