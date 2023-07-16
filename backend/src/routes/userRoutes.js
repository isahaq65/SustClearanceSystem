const router = require("express").Router();
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const upload = require("../utils/imageUploader");

router.post("/signout", auth, async (req, res) => {
  try {
    const user = req.user;
    user.tokens = user.tokens.filter((token) => req.token != token.token);
    console.log(user.tokens.length);
    res.cookie("token", ""), (res.user = "");
    await user.save();
    res.send({ result: "success" });
  } catch (e) {
    error = e.message;
    res.send({ error });
  }
});
router.post("/signin", async (req, res) => {
  try {
    const user = await User.verifyCredentials(
      req.body.email,
      req.body.password
    );
    if (!user) throw new Error("Invalid credentials");
    const token = await user.generateAuthToken();
    res.cookie("token", token);
    res.send({ user, token });
  } catch (e) {
    const error = e.message;
    res.status(400).send({ error });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, dept, regNo } = req.body;
    const existsEmail = await User.find({ email });
    if (existsEmail.length) throw new Error("Email already exists");
    let user;
    if (role === "student") {
      const existsregNo = await User.find({ regNo });
      if (existsregNo.length) throw new Error("RegNo already exists");
      user = new User({
        name,
        email,
        password,
        dept,
        regNo,
        role,
      });
    } else {
      user = new User({
        name,
        email,
        password,
        role,
        dept,
      });
    }
    await user.save();
    res.status(200).send(user);
  } catch (e) {
    const error = e.message;
    res.status(400).send({ error });
  }
});

router.post("/update-profile", [auth, upload.any()], async (req, res) => {
  try {
    const {
      nationality,
      session,
      fatherName,
      permanentAddress,
      currentAddress,
      mobile,
    } = req.body;
    const user = req.user;

    const files = req.files;
    const role = user.role;
    if (role === "student") {
      (user.session = session),
        (user.fatherName = fatherName),
        (user.permanentAddress = permanentAddress),
        (user.currentAddress = currentAddress),
        (user.mobile = mobile);
      user.nationality = nationality;
    }
    // console.log(user)
    user.profile = true;
    if (files) {
      user.saveImages(files);
    }
    res.status(200).send(user);
  } catch (e) {
    error = e.message;
    res.send({ error });
  }
});

router.post("/fetch-profile", auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    error = e.message;
    res.send({ error });
  }
});

module.exports = router;
