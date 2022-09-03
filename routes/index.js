var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

// router.post(
//   "/getLazyMintSignature/:category",
//   auth,
//   require("../controllers/getLazyMintSignature")
// );

// router.post(
//   "/mintMoments/:category",
//   auth,
//   require("../controllers/mintMoments")
// );


router.get("/nfcId/:id", auth, require("../controllers/getNFCId"));
router.patch("/nfcId/:id", auth, require("../controllers/patchNFCId"));

// router.get("/getAccessToken", require("../controllers/apiAuth"));

module.exports = router;
