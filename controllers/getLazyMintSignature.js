const { wallet } = require("../utils/ethereum/Diamond");
const ethers = require("ethers");

const getLazyMintSignature = async (req, res, next) => {
  const { hash } = req.body;
  console.log("sig hash: ", hash);

  try {
    const sign = async (message) =>
      await wallet
        .signMessage(ethers.utils.arrayify(message))
        .then((signature) => fixSignatureV(signature));

    var signature = await sign(hash);

    console.log("signature: ", signature);

    res.status(201).json({ signature });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Unable to create signature" });
  }
};

const fixSignatureV = (signature) => {
  const vVal = signature.substring(130, 132).toLowerCase();
  if (!["1b", "1c"].includes(vVal)) {
    if (vVal == "00") {
      signature = signature.substring(0, 130) + "1b";
    } else if (vVal == "01") {
      signature = signature.substring(0, 130) + "1c";
    } else {
      throw new Error(`Invalid signature v value: 0x${vVal}`);
    }
  }
  return signature;
};

module.exports = getLazyMintSignature;
