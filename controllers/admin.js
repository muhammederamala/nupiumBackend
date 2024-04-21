const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("../models/user");
const referral = require("../models/referral");
const message = require("../models/message");

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

const { Admin_User, Admin_Pass, TOKEN_KEY } = process.env;

const users = [{ id: 1, username: Admin_User, password: Admin_Pass }];

app.post("/login", async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;
    if (!username || !password) {
      return res.json({
        msg: "Please fill the login details completely",
        status: false,
      });
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.json({ msg: "Invalid credentials", status: false });
    }
    const expiresIn = rememberMe ? "7d" : "2h";
    const token = jwt.sign(
      { id: user.id, username: user.username },
      TOKEN_KEY,
      { expiresIn }
    );
    res.cookie("jwt", token, {
      secure: true,
      maxAge: expiresIn === "7d" ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      msg: "Login successful",
      status: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", status: false });
  }
});
app.get("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.clearCookie("refid");
    res.status(200).send("User Logged out and session ended");
  } catch (ex) {
    next(ex);
  }
});
app.post("/list", auth, async (req, res) => {
  try {
    const { country } = req.body;
    console.log(country);
    const data = await User.find({ country: country });
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cant find appropriate data", status: false });
  }
});
app.post("/referrals", auth, async (req, res) => {
  const { refid } = req.body;
  try {
    const data = await referral.find({ refid: refid });
    if (!data)
      res
        .status(500)
        .json({ msg: "Cant find appropriate data", status: false });
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cant find appropriate data", status: false });
  }
});
app.post("/editreferral", auth, async (req, res) => {
  try {
    const { refid, createdAt, name, type, category } = req.body;
    if (!createdAt || !name || !type || !category)
      res.status(400).json("Please fill all the required fields");
    const data = {
      ...req.body,
    };
    const chk = await referral.find(data);
    if (chk.length > 0)
      return res.status(400).json({ msg: "Exactly same data already exists" });
    const temp = await User.findOne({ refid: refid });
    const existing = await User.findOneAndUpdate(
      { refid: refid },
      { refcount: temp.refcount + 1 },
      { new: true }
    );
    console.log(existing);
    // existing.refcount++
    // existing.save()
    await referral.create(data);
    return res.status(200).json({ msg: "added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cant find appropriate data", status: false });
  }
});
app.post("/commission", auth, async (req, res) => {
  try {
    const { id, amount, mode } = req.body;
    if (!id || !amount || !mode)
      return res.status(400).json("Please fill all the required fields");
    const data = await referral.findById(id);
    data.amount = amount;
    data.mode = mode;
    data.save();
    return res.status(200).json({ msg: "added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cant find appropriate data", status: false });
  }
});
app.post("/notify", auth, async (req, res) => {
  try {
    const { refid, msg } = req.body;
    if (!refid || !msg)
      return res.status(400).json("Please fill all the required fields");
    await message.create({ refid, msg });
    return res.status(200).json({ msg: "notified successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cant find appropriate data", status: false });
  }
});
app.post("/notifyall", auth, async (req, res) => {
  try {
    const { msg } = req.body;
    if (!msg)
      return res.status(400).json("Please fill all the required fields");
    const data = await User.find({});
    for (let user of data) await message.create({ refid: user.refid, msg });
    return res.status(200).json({ msg: "notified everyone successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Cant find appropriate data", status: false });
  }
});

app.get("/home", auth, (req, res) => {
  res.status(200).send("User Logged in and Session is Active");
});

module.exports = app;
