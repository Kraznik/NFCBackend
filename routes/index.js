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

router.post(
  "/devconCreation",
  auth,
  require("../controllers/postDevconCreation")
);
router.get(
  "/downloadLink/:id",
  auth,
  require("../controllers/getDownloadLink")
);
router.get("/getDataUuid/:id", auth, require("../controllers/getDataUuid"));
router.get("/getDataNftTypeId/:id", auth, require("../controllers/getDataNft"));
router.get("/getDataWallet/:id", auth, require("../controllers/getDataWallet"));
router.post(
  "/claimDevconSticker",
  auth,
  require("../controllers/claimDevconSticker")
);

router.get(
  "/collectorLeaderboard",
  auth,
  require("../controllers/getCollecterLeaderboard")
);
router.get(
  "/creationLeaderboard",
  auth,
  require("../controllers/getCreationLeaderboard")
);

router.get(
  "/nfcLeaderboard",
  auth,
  require("../controllers/getNfcLeaderboard")
);

router.get("/getAccessToken", require("../controllers/apiAuth"));

//scavengerHunt

router.get("/getEvent/:id", auth, require("../controllers/getEventScavanger"));
router.get("/hunt/:eventId/:ticketId", auth, require("../controllers/getHunt"));
router.post("/hunt", auth, require("../controllers/postHunt"));
router.patch(
  "/hunt/:eventId/:ticketId",
  auth,
  require("../controllers/updateHunt")
);
router.get(
  "/huntLeadrboard/:eventId",
  auth,
  require("../controllers/getHuntLeaderboard")
);

router.post(
  "/mintHunt/:eventId",
  auth,
  require("../controllers/mintHuntToken")
);

module.exports = router;
