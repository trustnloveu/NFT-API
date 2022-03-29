//* Contract Address
const ContractAddress = require("../config/nft-address");

/**
 *  tokenInfo -> 토큰 이름 & 심볼
 */
exports.tokenInfo = async (req, res, next) => {
  const { nftContract } = req;

  const name = await nftContract.methods.name().call();
  const symbol = await nftContract.methods.symbol().call();

  res.send({
    name,
    symbol,
  });
};

/**
 *  totalSupply -> 총 토큰 발행량
 */
exports.totalSupply = async (req, res, next) => {
  const { nftContract } = req;

  const totalSupply = await nftContract.methods.totalSupply().call();

  res.send({ totalSupply });
};

/**
 *  balanceOf -> 보유 토큰 수량
 */
exports.balanceOf = async (req, res, next) => {
  const { nftContract } = req;

  const balanceOf = await nftContract.methods.balanceOf(req.body.sender).call();

  res.send({ balanceOf });
};

/**
 *  createToken -> 토큰 발행
 */
exports.createToken = async (req, res, next) => {
  // 컨트렉트, Web3 오브젝트
  const { nftContract, web3 } = req;

  // 개인키
  const PRIVATE_KEY = req.body.privateKey;

  // 토큰 URI 파라미터
  const TOKEN_URI = req.body.tokenURI ? req.body.tokenURI : "";

  // 트렌젝션 파라미터
  const from = req.body.sender;
  const to = ContractAddress;
  const gas = web3.utils.toHex("300000");
  const gasLimit = web3.utils.toHex("3000000");
  const nonce = await web3.eth.getTransactionCount(from, "latest");
  const data = nftContract.methods.createToken(TOKEN_URI).encodeABI();

  // 트렌젝션 객체
  const transaction = {
    from,
    to,
    gas,
    gasLimit,
    nonce,
    data,
  };

  // 트렌젝션 생성
  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  );

  // 트렌젝션 전송
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction,
    (error, hash) => {
      if (!error) {
        console.log("Transaction Hash ::: " + hash);
      } else {
        console.log("Transaction Error ::: " + error);
      }
    }
  );

  // 로그
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);

  // Return
  res.send({ transactionReceipt });
};

/**
 *  createAccount -> 계정 생성
 */
exports.createAccount = async (req, res, next) => {
  // Web3 오브젝트
  const { web3 } = req;

  const randomHex = web3.utils.randomHex(32);

  const result = await web3.eth.accounts.create(randomHex);

  console.log(result);

  res.rend({ result });
};
