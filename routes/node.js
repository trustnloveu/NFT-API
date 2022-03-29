//* Route > /
const express = require("express");
const router = express.Router();

// Controllers
const nodeController = require("../controllers/node");

// GET : /tokenInfo
router.get("/tokenInfo", nodeController.tokenInfo);

// GET : /totalSupply
router.get("/totalSupply", nodeController.totalSupply);

// GET : /balanceOf
router.get("/balanceOf", nodeController.balanceOf);

// GET : /ownerOf/:tokenId
router.get("/ownerOf/:tokenId", nodeController.ownerOf);

// GET : /tokenURI/:tokenId
router.get("/tokenURI/:tokenId", nodeController.tokenURI);

// GET : /tokenByIndex/:tokenIdex
router.get("/tokenByIndex/:tokenIndex", nodeController.tokenByIndex);

// GET : /tokenOfOwnerByIndex
router.get("/tokenOfOwnerByIndex", nodeController.tokenOfOwnerByIndex);

// GET : /allTokens
router.get("/allTokens", nodeController.allTokens);

// POST : /createToken
router.post("/createToken", nodeController.createToken);

// POST : /createAccount
router.post("/createAccount", nodeController.createAccount);

// GET : /getToken/[uuid]
// router.get("/getToken/:productId", shopController.getProductDetail);

//* Export
module.exports = router;
