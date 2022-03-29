//* Route > /
const express = require("express");
const router = express.Router();

// Controllers
const nodeController = require("../controllers/node");

/**
 * GET : /tokenInfo
 *
 * @swagger
 *  /node/tokenInfo:
 *      get:
 *          summary: "토큰 정보 조회 (이름, 심볼)"
 *          tags: [GET]
 *          description: 토큰 이름, 심볼 조회
 *          responses:
 *              "200":
 *                  description: 토큰 정보(이름, 심볼)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      description: "토큰 이름"
 *                                  symbol:
 *                                      type: string
 *                                      description: "토큰 심볼"
 */
router.get("/tokenInfo", nodeController.tokenInfo);

/**
 * GET : /totalSupply
 *
 * @swagger
 *  /node/totalSupply:
 *      get:
 *          summary: "토큰 총 발행량"
 *          tags: [GET]
 *          description: 토큰 총 발행량 조회
 *          responses:
 *              "200":
 *                  description: 토큰 정보(이름, 심볼)
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  totalSupply:
 *                                      type: integer
 *                                      description: "토큰 총 발행량"
 */
router.get("/totalSupply", nodeController.totalSupply);

// *          parameters:
// *              - in: path
// *                name: ownerAddress
// *                required: true
// *                description: 조회하고자 하는 주소(Address)
// *                schema:
// *                  type: string
/**
 * GET : /balanceOf
 *
 * @swagger
 *  /node/balanceOf:
 *      get:
 *          summary: "특정 주소 보유 토큰 수량 확인"
 *          tags: [GET]
 *          description: 토큰 이름, 심볼 조회
 *          requestBody:
 *              description: 주소(Address)를 전달받아 보유중인 토큰 수량 반환
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ownerAddress:
 *                                  type: string
 *                                  description: "조회하고자 하는 주소(Owner Address)"
 *          responses:
 *              "200":
 *                  description: 특정 주소 보유 토큰 수량 확인
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  balanceOf:
 *                                      type: integer
 *                                      description: "보유 토큰 수량"
 */
router.get("/balanceOf", nodeController.balanceOf);

// GET : /ownerOf
router.get("/ownerOf", nodeController.ownerOf);

// GET : /tokenURI
router.get("/tokenURI", nodeController.tokenURI);

// GET : /tokenByIndex
router.get("/tokenByIndex", nodeController.tokenByIndex);

// GET : /tokenOfOwnerByIndex
router.get("/tokenOfOwnerByIndex", nodeController.tokenOfOwnerByIndex);

// GET : /allTokens
router.get("/allTokens", nodeController.allTokens);

// GET : /getApproved
router.get("/getApproved", nodeController.getApproved);

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
