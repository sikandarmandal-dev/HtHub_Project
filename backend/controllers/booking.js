const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/bookingSchema");
const Tutor = require("../models/tutorSchema");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
    try {
        const filter = req.user.role === "student" ? { student: req.user.id } : { tutor: req.user.id };
        const bookings = await Booking.find(filter)
            .populate("student", "name email")
            .populate("tutor", "name subject location fees")
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) { next(error); }
});

router.post("/", authenticate, authorize("student"), async (req, res, next) => {
    try {
        const { tutorId, subject, preferredDate, message } = req.body;
        if (!mongoose.isValidObjectId(tutorId) || !subject || !preferredDate) {
            return res.status(400).json({ message: "Tutor, subject and preferred date are required" });
        }
        const tutor = await Tutor.findById(tutorId);
        if (!tutor) return res.status(404).json({ message: "Tutor not found" });
        const booking = await Booking.create({ student: req.user.id, tutor: tutor._id, subject, preferredDate, message });
        res.status(201).json(await booking.populate("tutor", "name subject location fees"));
    } catch (error) { next(error); }
});

router.patch("/:id/status", authenticate, authorize("tutor"), async (req, res, next) => {
    try {
        if (!["accepted", "declined", "completed"].includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid booking status" });
        }
        const tutor = await Tutor.findOne({ _id: req.user.id });
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, tutor: tutor && tutor._id },
            { status: req.body.status },
            { new: true }
        );
        if (!booking) return res.status(404).json({ message: "Booking not found" });
        res.json(booking);
    } catch (error) { next(error); }
});

module.exports = router;
