//* Route > /node
const express = require("express");
const router = express.Router();

//* Controllers
const nodeController = require("../controllers/node");

/**
 * @swagger
 *  /tokenInfo:
 *      get:
 *          summary: "토큰 정보 조회 (이름 & 심볼)"
 *          tags: [GET]
 *          description: "토큰 이름, 심볼 조회"
 *          responses:
 *              200:
 *                  description: "토큰 정보(이름, 심볼)"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/tokenInfo"
 */
router.get("/tokenInfo", nodeController.tokenInfo);

/**
 * @swagger
 *  /totalSupply:
 *      get:
 *          summary: "토큰 총 발행량"
 *          tags: [GET]
 *          description: "토큰 총 발행량 조회"
 *          responses:
 *              200:
 *                  description: "토큰 정보(이름, 심볼)"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/totalSupply"
 */
router.get("/totalSupply", nodeController.totalSupply);

/**
 * @swagger
 *  /balanceOf/{ownerAddress}:
 *      get:
 *          summary: "특정 주소 보유 토큰 수량 확인"
 *          tags: [GET]
 *          description: "특정 주소 보유 토큰 수량 반환"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: ownerAddress
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/ownerAddress"
 *          responses:
 *              200:
 *                  description: "보유 토큰 수량"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/balanceOf"
 */
router.get("/balanceOf/:ownerAddress", nodeController.balanceOf);

/**
 * @swagger
 *  /ownerOf/{tokenId}:
 *      get:
 *          summary: "토큰 소유자 확인"
 *          tags: [GET]
 *          description: "특정 토큰 소유자 주소 반환"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: tokenId
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/tokenId"
 *          responses:
 *              200:
 *                  description: "보유 토큰 수량"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/ownerAddress"
 */
router.get("/ownerOf/:tokenId", nodeController.ownerOf);

/**
 * @swagger
 *  /tokenURI/{tokenId}:
 *      get:
 *          summary: "토큰 URI 확인"
 *          tags: [GET]
 *          description: "특정 토큰 URI 반환"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: tokenId
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/tokenId"
 *          responses:
 *              200:
 *                  description: "보유 토큰 URI"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/tokenURI"
 */
router.get("/tokenURI/:tokenId", nodeController.tokenURI);

/**
 * @swagger
 *  /tokenByIndex/{tokenIndex}:
 *      get:
 *          summary: "토큰 ID 확인 (전체 Index 참조)"
 *          tags: [GET]
 *          description: "특정 토큰 ID 반환"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: tokenIndex
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/tokenIndex"
 *          responses:
 *              200:
 *                  description: 보유 토큰 수량
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/tokenId"
 */
router.get("/tokenByIndex/:tokenIndex", nodeController.tokenByIndex);

/**
 * @swagger
 *  /tokenOfOwnerByIndex/{tokenOwner}/{tokenIndex}:
 *      get:
 *          summary: "토큰 ID 확인 (지갑 Index 참조)"
 *          tags: [GET]
 *          description: "특정 토큰 URI 반환"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: tokenOwner
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/ownerAddress"
 *            - in: path
 *              name: tokenIndex
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/tokenIndex"
 *          responses:
 *              200:
 *                  description: "보유 토큰 수량"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/tokenId"
 */
router.get(
  "/tokenOfOwnerByIndex/:tokenOwner/:tokenIndex",
  nodeController.tokenOfOwnerByIndex
);

/**
 * @swagger
 *  /allTokens:
 *      get:
 *          summary: "전체 토큰 리스트"
 *          tags: [GET]
 *          description: "전체 토큰 리스트 반환"
 *          responses:
 *              200:
 *                  description: "보유 토큰 수량"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/allTokens"
 */
router.get("/allTokens", nodeController.allTokens);

/**
 * @swagger
 *  /getApproved/{tokenId}:
 *      get:
 *          summary: "토큰 소유 권한(Approval) 주소 확인 (제 3자)"
 *          tags: [GET]
 *          description: "제 3자 토큰 소유 권한(Approval) 주소값(Address) 반환"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: tokenId
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/tokenId"
 *          responses:
 *              200:
 *                  description: 보유 토큰 URI
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/result"
 */
router.get("/getApproved/:tokenId", nodeController.getApproved);

/**
 * @swagger
 *  /isApprovedForAll/{tokenOwner}/{operator}:
 *      get:
 *          summary: "오퍼레이터(Operator) 권한 확인"
 *          tags: [GET]
 *          description: "제 3자 토큰 관리 권한 부여 여부 반환(true/false)"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          parameters:
 *            - in: path
 *              name: tokenOwner
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/ownerAddress"
 *            - in: path
 *              name: operator
 *              content:
 *                  schema:
 *                      $ref: "#/components/parameters/ownerAddress"
 *          responses:
 *              200:
 *                  description: 보유 토큰 URI
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/result"
 */
router.get(
  "/isApprovedForAll/:tokenOwner/:operator",
  nodeController.isApprovedForAll
);

/**
 * @swagger
 *  /createToken:
 *      post:
 *          summary: "토큰 발행"
 *          tags: [POST]
 *          description: "NFT 토큰 발행"
 *          consumes:
 *            - application/x-www-form-urlencoded
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/parameters/createToken"
 *          responses:
 *              200:
 *                  description: 토큰 발행 결과
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/createToken"
 */
router.post("/createToken", nodeController.createToken);

/**
 * @swagger
 *  /createAccount:
 *      post:
 *          summary: "계정 생성"
 *          tags: [POST]
 *          description: "주소(Addres), 개인키(Private Key) 생성"
 *          responses:
 *              200:
 *                  description: "주소(Addres), 개인키(Private Key) 생성"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/createAccount"
 */
router.post("/createAccount", nodeController.createAccount);

/**
 * @swagger
 *  /approve:
 *      post:
 *          summary: "토큰 소유권 허용"
 *          tags: [POST]
 *          description: "토큰 소유권(Approval) 허용"
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/parameters/approve"
 *          responses:
 *              200:
 *                  description: "제 3자에게 토큰 소유권 허용"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/result"
 */
router.post("/approve", nodeController.approve);

/**
 * @swagger
 *  /safeTransferFrom:
 *      post:
 *          summary: "토큰 전송"
 *          tags: [POST]
 *          description: "토큰 전송"
 *          requestBody:
 *              required: false
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/parameters/safeTransferFrom"
 *          responses:
 *              200:
 *                  description: "토큰 전송"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/result"
 */
router.post("/safeTransferFrom", nodeController.safeTransferFrom);

/**
 * @swagger
 *  /setApprovalForAll:
 *      post:
 *          summary: "특정 주소 토큰 소유권 허용"
 *          tags: [POST]
 *          description: "특정 주소(Operator) 토큰 소유권(Approval) 허용"
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/parameters/setApprovalForAll"
 *          responses:
 *              200:
 *                  description: "제 3자에게 토큰 소유권 허용"
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/result"
 */
router.post("/setApprovalForAll", nodeController.setApprovalForAll);

// GET : /getToken/[uuid]
// router.get("/getToken/:productId", shopController.getProductDetail);

//* Export
module.exports = router;
