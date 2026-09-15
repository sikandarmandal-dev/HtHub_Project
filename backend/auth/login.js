const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        const valid = user && await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user._id.toString(), role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
