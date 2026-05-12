const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const router = express.Router();

router.post("/login", async (req, res) => {
    let { email, password } = req.params;

    const notExistEmail = await User.findOne({ email });

    if (!notExistEmail) {
        return res.json({ message: "not existed" })
    }
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
        return res.json({ msg: "invalid credential" })
    }
    res.json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
})
module.exports = router;


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userSchema");

// const router = express.Router();

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             "yourSecretKey", // replace with process.env.JWT_SECRET
//             { expiresIn: "1h" }
//         );

//         res.json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;
