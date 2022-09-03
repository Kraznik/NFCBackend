const { wallet1, wallet2, wallet3 } = require("../utils/ethereum/Diamond");
const ethers = require("ethers");

const getLazyMintSignature = async (req, res, next) => {
  const { hash } = req.body;
  const { category } = req.params;
  console.log("sig hash: ", hash);

  if (category === "ethbcn") {
    var wallet = wallet1;
  } else if (category === "dogud") {
    var wallet = wallet2;
  } else if (category === "ethcc") {
    var wallet = wallet3;
  }

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
