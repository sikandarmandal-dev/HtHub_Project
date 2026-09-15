const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const { name, email, password, role = "student" } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        if (!["student", "tutor"].includes(role)) {
            return res.status(400).json({ message: "Invalid account role" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        if (await User.exists({ email: normalizedEmail })) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: await bcrypt.hash(password, 12),
            role
        });
        res.status(201).json({
            message: "Account created successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
