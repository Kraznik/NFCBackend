const {
  Diamond1,
  wallet1,
  Diamond2,
  wallet2,
  Diamond3,
  wallet3,
} = require("../ethereum/Diamond");
const ethers = require("ethers");
const calculateGasFee = require("../calculateGasFee");
const axios = require("axios");
const config = require("../../config");

const buyLazyMint = async (nftTypeId, params, category) => {
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
  const gasFees = await calculateGasFee();

  //   console.log(params.nftTypeDefinition.ipfsCid);

  const array = Object.values(params.nftTypeDefinition.ipfsCid);
  //   console.log(array);

  params.nftTypeDefinition.ipfsCid = array;

  try {
    const url = `${config.dgApiBaseUrl}/creation/artwork/${nftTypeId}`;
    const { data } = await axios.get(url);
    var creatorSignature = data.saleSetting.signature;
  } catch (err) {
    console.error(err);
  }

  const BYTES_ZERO = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(["uint256"], [0])
  );

  console.log("BYTES_ZERO: ", BYTES_ZERO);
  console.log("fetched sig: ", creatorSignature);
  const donation = 0,
    amount = 1, // number of editions to be minted
    dummyPaymentPermit = {
      amount: 0,
      deadline: 0,
      r: BYTES_ZERO,
      s: BYTES_ZERO,
      v: 0,
    };

  const tx = await Diamond.buyLazyMint(
    params, //lazy mint params
    amount, //
    donation, //Optional extra SIO donation
    creatorSignature, // signature that's passed to sale settings
    dummyPaymentPermit, // paymentPermit // Optional EIP-2612 permit
    gasFees
  );
  console.log(tx.hash);
  console.log("pending...");
  await tx.wait();
  console.log("Txn completed..");
};

module.exports = buyLazyMint;
