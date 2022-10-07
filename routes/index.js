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

router.post("/claimWithNfc", auth, require("../controllers/claimWithNfc"));

router.get("/nfcId/:id", auth, require("../controllers/getNFCId"));
router.patch("/nfcId/:id", auth, require("../controllers/patchNFCId"));

router.get("/getAccessToken", require("../controllers/apiAuth"));

//scavengerHunt

router.get("/getEvent/:id", auth, require("../controllers/getEventScavanger"));
router.get("/hunt/:eventId/:ticketId", auth, require("../controllers/getHunt"));
router.post("/hunt", auth, require("../controllers/postHunt"));
router.patch("/hunt/:eventId/:ticketId", auth, require("../controllers/updateHunt"));
router.get("/huntLeadrboard/:eventId", auth, require("../controllers/getHuntLeaderboard"));

module.exports = router;
