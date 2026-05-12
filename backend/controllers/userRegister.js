const express = require("express");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/register", async (req, res) => {

    let { name, email, password, role } = req.body;
    const userExist = await User.findOne({ email })
    if (userExist) {
        return res.json({ message: "Existing user" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role
    })
    await newUser.save().then((res) => {
        console.log("sucessfully registerd");
    }).catch((err) => {
        console.log("not registerd");
    })
})
module.exports = router;