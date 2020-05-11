const express = require("express");
const router = express.Router();
const passport = require("../../services/passport");
const { createUser } = require("../../models/user");

module.exports = router;

// @route   Post api/auth/signup
// @desc    Create A User
// @access  Public
router.post("/signup", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(200).json(user.id);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @route   Post api/auth/login
// @desc    Authenticate A User
// @access  Public
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // console.log("/////////////////////////////////////");
      // console.log("Inside login - req.session: ", req.session);
      // console.log("Inside login - req.sessionID: ", req.sessionID);
      // console.log("Here", req.session.passport.user);
      return res.status(200).json(user.id);
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(() => {
    res.status(200).json({ mgs: "Successfully logged out" });
  });
});

router.get("/isAlreadyLoggedIn", (req, res) => {
  try {
    res.status(200).json(req.user.id);
  } catch (err) {
    res.status(200).json(false);
  }
});