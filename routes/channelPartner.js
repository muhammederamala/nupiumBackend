const express = require("express");
const router = express.Router();
const logout = require("../controllers/channelPartner");
const login = require("../controllers/channelPartner");
const upload = require("../controllers/channelPartner");
const referral = require("../controllers/channelPartner");
const commission = require("../controllers/channelPartner");
const notify = require("../controllers/channelPartner");
const user = require("../controllers/channelPartner");
const payout = require("../controllers/channelPartner");
const icon = require("../controllers/channelPartner");
const register = require("../controllers/channelPartner");
const mail = require("../controllers/channelPartner");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/upload", upload);
router.post("/referral", referral);
router.post("/commission", commission);
router.get("/notify", notify);
router.post("/icon", icon);
router.post("/payout", payout);
router.post("/user", user);
router.patch("/user", user);
router.post("/mail", mail);

module.exports = router;
