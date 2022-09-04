var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

router.post(
  "/getLazyMintSignature",
  auth,
  require("../controllers/getLazyMintSignature")
);

router.post(
  "/mintNfcCreation",
  auth,
  require("../controllers/mintNfcCreation")
);

router.get("/nfcId/:id", auth, require("../controllers/getNFCId"));
router.patch("/nfcId/:id", auth, require("../controllers/patchNFCId"));

router.get("/getAccessToken", require("../controllers/apiAuth"));

module.exports = router;
