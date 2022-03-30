//* Route > /
const express = require("express");
const router = express.Router();

// Controllers
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
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/ownerAddress"
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
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/tokenId"
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
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/tokenId"
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
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/tokenIndex"
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
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/ownerAddress"
 *            - in: path
 *              name: tokenIndex
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/tokenIndex"
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
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                         $ref: "#/components/parameters/tokenId"
 *          responses:
 *              200:
 *                  description: 보유 토큰 URI
 *                  content:
 *                      application/x-www-form-urlencoded:
 *                          schema:
 *                              $ref: "#/components/schemas/ownerAddress"
 */
router.get("/getApproved/:tokenId", nodeController.getApproved);

// GET : /isApprovedForAll
router.get("/isApprovedForAll", nodeController.isApprovedForAll);

// POST : /createToken
router.post("/createToken", nodeController.createToken);

// POST : /createAccount
router.post("/createAccount", nodeController.createAccount);

// POST : /approve
router.post("/approve", nodeController.approve);

// POST : /safeTransferFrom
router.post("/safeTransferFrom", nodeController.safeTransferFrom);

// POST : /setApprovalForAll
router.post("/setApprovalForAll", nodeController.setApprovalForAll);

// GET : /getToken/[uuid]
// router.get("/getToken/:productId", shopController.getProductDetail);

//* Export
module.exports = router;
