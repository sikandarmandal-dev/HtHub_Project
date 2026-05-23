const express = require("express");
const Tutor = require("../models/tutorSchema");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/find", async (req, res) => {
    try {
        const tutors = await Tutor.find();
        res.json(tutors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
