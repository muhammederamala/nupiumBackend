const express = require("express");
const router = express.Router();
const login = require("../controllers/admin");
const logout = require("../controllers/admin");
const list = require("../controllers/admin");
const editreferral = require("../controllers/admin");
const referrals = require("../controllers/admin");
const commission = require("../controllers/admin");
const notify = require("../controllers/admin");
const notifyall = require("../controllers/admin");
const home = require("../controllers/admin");

const sessionMiddleware = require("../middleware/session");

router.post("/login", login);
router.get("/logout", sessionMiddleware, logout);
router.post("/list", sessionMiddleware, list);
router.post("/referrals", sessionMiddleware, referrals);
router.post("/editreferral", sessionMiddleware, editreferral);
router.post("/commission", sessionMiddleware, commission);
router.post("/notify", sessionMiddleware, notify);
router.post("/notifyall", sessionMiddleware, notifyall);
router.get("/home", sessionMiddleware, home);

module.exports = router;
