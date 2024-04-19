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

const sessionMiddleware = require("../middleware/session");

router.post("/register", sessionMiddleware, register);
router.post("/login", sessionMiddleware, login);
router.get("/logout", sessionMiddleware, logout);
router.post("/upload", sessionMiddleware, upload);
router.post("/referral", sessionMiddleware, referral);
router.post("/commission", sessionMiddleware, commission);
router.get("/notify", sessionMiddleware, notify);
router.post("/icon", sessionMiddleware, icon);
router.post("/payout", sessionMiddleware, payout);
router.post("/user", sessionMiddleware, user);
router.patch("/user", sessionMiddleware, user);
router.post("/mail", mail);

module.exports = router;
