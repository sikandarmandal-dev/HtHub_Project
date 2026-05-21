const express = require("express");
const Tutor = require("../models/tutorSchema");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/register", async (req, res) => {
    let { name, email, subject, experience, timing, location, fees, availability } = req.body;
    console.log(req.body);
    const newTutor = new Tutor({
        name,
        email,
        subject,
        experience,
        timing,
        location,
        fees,
        availability,
    })
    await newTutor.save().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err);
    })

})
module.exports = router;


