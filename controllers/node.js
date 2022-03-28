//* Imports
const UNFT = require("../truffle_abis/UNFT");
const ContractAddress = require("../config/nft-address");

//* getTokenInfo -> 토큰 정보
exports.getTokenInfo = async (req, res, next) => {
  const { web3 } = req;

  const contract = new web3.eth.Contract(UNFT.abi, ContractAddress);

  const test = await contract.methods.totalSupply().call();

  console.log(test);
};
