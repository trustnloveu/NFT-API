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

// POST : /createToken
router.post("/createToken", nodeController.createToken);

// POST : /createAccount
router.post("/createAccount", nodeController.createAccount);

// POST : /approve
router.post("/approve", nodeController.approve);

// GET : /getToken/[uuid]
// router.get("/getToken/:productId", shopController.getProductDetail);

//* Export
module.exports = router;
