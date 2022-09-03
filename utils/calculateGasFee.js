const { BigNumber, providers } = require("ethers");
const config = require("../config");

const maxWei = 30000000000;

const calculateGasFee = async () => {
  const rpc = new providers.JsonRpcProvider(config.alchemyUrl);
  const feeData = await rpc.getFeeData();
  const maxPriorityFeePerGas = BigNumber.from(
    Math.max(maxWei, Number(feeData.maxPriorityFeePerGas))
  );
  const maxFeePerGas = maxPriorityFeePerGas.add(
    BigNumber.from(feeData.maxFeePerGas).sub(
      BigNumber.from(feeData.maxPriorityFeePerGas)
    )
  );

  return {
    maxPriorityFeePerGas,
    maxFeePerGas,
  };
};

module.exports = calculateGasFee;
