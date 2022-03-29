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

  res.send(tokenInfo);
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
  const { tokenId } = req.body;

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
  const { sender } = req.body.sender;

  try {
    balanceOf = await nftContract.methods.balanceOf(sender).call();
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
  const { tokenId } = req.body;

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
  const { tokenIndex } = req.body;

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
  const { tokenIndex, tokenOwner } = req.body;

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

  // 전체 토큰 리스트
  const tokenList = [];

  try {
    // 총 발행량 -> for문 연결
    const totalSupply = await nftContract.methods.totalSupply().call();

    // totalSupply 값을 수정해서 페이징 구현 가능
    // ...

    for (let i = 0; i < totalSupply; i++) {
      // 토큰 ID, Owner Address
      const tokenId = await nftContract.methods.tokenByIndex(i).call();
      const tokenOwner = await nftContract.methods.ownerOf(tokenId).call();

      // 리스트에 추가될 Map
      const map = {};
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

  // 파라미터 (privateKey, tokenURI)
  const { privateKey, tokenURI = "" } = req.body;

  // 트렌젝션 파라미터
  const from = req.body.sender;
  const to = ContractAddress;
  const gas = web3.utils.toHex("300000");
  const gasLimit = web3.utils.toHex("3000000");
  const nonce = await web3.eth.getTransactionCount(from, "latest");
  const data = nftContract.methods.createToken(tokenURI).encodeABI();

  // 파라미터 Null 체크
  // ...

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
    privateKey,
    (error, result) => {
      if (!error) {
        console.log("Transaction Result ::: ");
        console.log(result);
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
    result = await web3.eth.accounts.create(randomHex); // address, private key 반환
  } catch (error) {
    res.send(error);
  }

  // Private Key 암호화 (선택) -> web3.eth.accounts.encrypt(privateKey, password);
  // ...

  res.send({ result });
};

/*********************************************************************************/
//                          approve -> 다른 사람에게 토큰 소유권 허용
/*********************************************************************************/
exports.approve = async (req, res, next) => {
  // Web3 오브젝트
  const { nftContract, web3 } = req;

  // owner == to 예외처리
  // ...

  // 개인키
  const privateKey = req.body.privateKey;

  // 파라미터
  const { sender, approveAddress, tokenId } = req.body;

  // 트렌젝션 파라미터
  const from = sender;
  const to = ContractAddress;
  const gas = web3.utils.toHex("300000");
  const gasLimit = web3.utils.toHex("3000000");
  const nonce = await web3.eth.getTransactionCount(from, "latest");
  const data = nftContract.methods.approve(approveAddress, tokenId).encodeABI();

  // 파라미터 Null 체크
  // ...

  // 트렌젝션 객체
  const transaction = {
    from,
    to,
    gas,
    gasLimit,
    nonce,
    data,
  };

  // 트렌젝션 생성 (권한 허용)
  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey,
    (error, result) => {
      if (!error) {
        console.log("Transaction Result ::: ");
        console.log(result);
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
//                          getApproved -> 토큰 소유권 확인 (소유자가 아닌 제 3자)
/*********************************************************************************/
exports.getApproved = async (req, res, next) => {
  // Web3 오브젝트
  const { nftContract } = req;

  // 토큰 ID
  const { tokenId } = req.body;

  // 권한 허용
  let result;
  try {
    result = await nftContract.methods.getApproved(tokenId).call(); // null = 0x0000000000000000000000000000000000000000
  } catch (error) {
    res.send(error);
  }

  res.send({ result });
};

/*********************************************************************************/
//                          safeTransferFrom -> 토큰 전송
/*********************************************************************************/
exports.safeTransferFrom = async (req, res, next) => {
  const { nftContract, web3 } = req;

  // 파라미터
  const {
    privateKey,
    sender,
    fromAddress,
    toAddress,
    tokenId,
    callData = "",
  } = req.body;

  // 트렌젝션 파라미터
  const from = sender;
  const to = ContractAddress;
  const gas = web3.utils.toHex("300000");
  const gasLimit = web3.utils.toHex("3000000");
  const nonce = await web3.eth.getTransactionCount(from, "latest");

  let data;

  // EOA 전송 ABI 코드
  if (callData === "") {
    data = nftContract.methods
      .safeTransferFrom(fromAddress, toAddress, tokenId)
      .encodeABI();
  }
  // CA 전송 ABI 코드
  else {
    data = nftContract.methods
      .safeTransferFrom(fromAddress, toAddress, tokenId, callData)
      .encodeABI();
  }

  // 파라미터 Null 체크
  // ...

  // 트렌젝션 객체
  const transaction = {
    from,
    to,
    gas,
    gasLimit,
    nonce,
    data,
  };

  // 트렌젝션 생성 (권한 허용)
  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey,
    (error, result) => {
      if (!error) {
        console.log("Transaction Result ::: ");
        console.log(result);
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
//                          setApprovalForAll ->
/*********************************************************************************/
exports.setApprovalForAll = async (req, res, next) => {
  const { nftContract, web3 } = req;

  // 파라미터
  const { privateKey, sender, operator, approved } = req.body;

  // 트렌젝션 파라미터
  const from = sender;
  const to = ContractAddress;
  const gas = web3.utils.toHex("300000");
  const gasLimit = web3.utils.toHex("3000000");
  const nonce = await web3.eth.getTransactionCount(from, "latest");
  const data = nftContract.methods
    .setApprovalForAll(operator, approved)
    .encodeABI();

  // 파라미터 Null 체크
  // ...

  // 트렌젝션 객체
  const transaction = {
    from,
    to,
    gas,
    gasLimit,
    nonce,
    data,
  };

  // 트렌젝션 생성 (권한 허용)
  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey,
    (error, result) => {
      if (!error) {
        console.log("Transaction Result ::: ");
        console.log(result);
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
//                          isApprovedForAll ->
/*********************************************************************************/
exports.isApprovedForAll = async (req, res, next) => {
  const { nftContract } = req;

  // 토큰 ID
  const { tokenOwner, operator } = req.body;

  // 파라미터 Null 체크
  // ...

  // 권환 확인
  let result;
  try {
    result = await nftContract.methods
      .isApprovedForAll(tokenOwner, operator)
      .call(); // null = 0x0000000000000000000000000000000000000000
  } catch (error) {
    res.send(error);
  }

  res.send({ result });
};

/*********************************************************************************/
//                          burn -> 토큰 소각 (컨트렉트에 토큰 소각 코드 추가 안되어있음)
/*********************************************************************************/
