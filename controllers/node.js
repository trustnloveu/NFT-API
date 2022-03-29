//* Contract Address
const ContractAddress = require("../config/nft-address");

/*********************************************************************************/
//                          tokenInfo -> 토큰 이름 & 심볼
/*********************************************************************************/
exports.tokenInfo = async (req, res, next) => {
  const { nftContract } = req;

  let tokenInfo = {};

  try {
    tokenInfo.name = await nftContract.methods.name().call();
    tokenInfo.symbol = await nftContract.methods.symbol().call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ tokenInfo });
};

/*********************************************************************************/
//                          totalSupply -> 총 토큰 발행량
/*********************************************************************************/
exports.totalSupply = async (req, res, next) => {
  const { nftContract } = req;

  let totalSupply;

  try {
    totalSupply = await nftContract.methods.totalSupply().call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ totalSupply });
};

/*********************************************************************************/
//                          ownerOf -> 총 토큰 발행량
/*********************************************************************************/
exports.ownerOf = async (req, res, next) => {
  const { nftContract } = req;

  let owner;
  const tokenId = req.params.tokenId;

  try {
    owner = await nftContract.methods.ownerOf(tokenId).call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ owner });
};

/*********************************************************************************/
//                          balanceOf -> 보유 토큰 수량
/*********************************************************************************/
exports.balanceOf = async (req, res, next) => {
  const { nftContract } = req;

  let balanceOf;
  const address = req.body.sender;

  try {
    balanceOf = await nftContract.methods.balanceOf(address).call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ balanceOf });
};

/*********************************************************************************/
//                          tokenURI -> 토큰 URI
/*********************************************************************************/
exports.tokenURI = async (req, res, next) => {
  const { nftContract } = req;

  let tokenURI;
  const tokenId = req.params.tokenId;

  try {
    tokenURI = await nftContract.methods.tokenURI(tokenId).call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ tokenURI });
};

/*********************************************************************************/
//                          tokenByIndex -> Index로 토큰 ID 조회
/*********************************************************************************/
exports.tokenByIndex = async (req, res, next) => {
  const { nftContract } = req;

  let tokenId;
  const tokenIndex = req.params.tokenIndex;

  try {
    tokenId = await nftContract.methods.tokenByIndex(tokenIndex).call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ tokenId });
};

/*********************************************************************************/
//                          tokenOfOwnerByIndex -> Address, Index로 토큰 조회
/*********************************************************************************/
exports.tokenOfOwnerByIndex = async (req, res, next) => {
  const { nftContract } = req;

  let tokenId;
  const tokenIndex = req.body.tokenIndex;
  const tokenOwner = req.body.tokenOwner;

  try {
    tokenId = await nftContract.methods
      .tokenOfOwnerByIndex(tokenOwner, tokenIndex)
      .call();
  } catch (error) {
    res.send({ error });
  }

  res.send({ tokenId });
};

/*********************************************************************************/
//                          allTokens -> 전체 토큰 리스트
/*********************************************************************************/
exports.allTokens = async (req, res, next) => {
  const { nftContract } = req;

  const tokenList = [];

  try {
    const map = {};
    const totalSupply = await nftContract.methods.totalSupply().call();

    for (let i = 0; i < totalSupply; i++) {
      const tokenId = await nftContract.methods.tokenByIndex(i).call();
      const tokenOwner = await nftContract.methods.ownerOf(tokenId).call();

      map.tokenId = tokenId;
      map.tokenOwner = tokenOwner;

      tokenList.push(map);
    }
  } catch (error) {
    res.send({ error });
  }

  res.send({ tokenList });
};

/*********************************************************************************/
//                          createToken -> 토큰 발행
/*********************************************************************************/
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
    PRIVATE_KEY,
    (error, result) => {
      if (!error) {
        console.log("Transaction Result ::: " + result);
      } else {
        console.log("Transaction Error ::: " + error);
        res.send(error);
      }
    }
  );

  // 트렌젝션 전송
  const transactionReceipt = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction,
    (error, hash) => {
      if (!error) {
        console.log("Transaction Hash ::: " + hash);
      } else {
        console.log("Transaction Error ::: " + error);
        res.send(error);
      }
    }
  );

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);

  res.send({ transactionReceipt });
};

/*********************************************************************************/
//                          createAccount -> 계정 생성
/*********************************************************************************/
exports.createAccount = async (req, res, next) => {
  // Web3 오브젝트
  const { web3 } = req;

  // 엔트로피 -> 32 자리 랜덤 Hex 문자열
  const randomHex = web3.utils.randomHex(32);

  // 계정 생성(address, private key)
  let result;
  try {
    result = await web3.eth.accounts.create(randomHex);
  } catch (error) {
    res.send(error);
  }

  res.send({ result });
};

/*********************************************************************************/
//                          approve -> 토큰 소유권 권한 설정
/*********************************************************************************/

/*********************************************************************************/
//                          safeTransferFrom -> 토큰 전송
/*********************************************************************************/

/*********************************************************************************/
//                          burn -> 토큰 소각
/*********************************************************************************/
