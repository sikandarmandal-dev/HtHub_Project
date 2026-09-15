const express = require("express");
const Tutor = require("../models/tutorSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { subject, location, minFees, maxFees, page = 1, limit = 12 } = req.query;
        const query = {};
        if (subject) query.subject = new RegExp(String(subject).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        if (location) query.location = new RegExp(String(location).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        if (minFees || maxFees) query.fees = {};
        if (minFees) query.fees.$gte = Number(minFees);
        if (maxFees) query.fees.$lte = Number(maxFees);

        const safeLimit = Math.min(Math.max(Number(limit) || 12, 1), 50);
        const currentPage = Math.max(Number(page) || 1, 1);
        const [tutors, total] = await Promise.all([
            Tutor.find(query).select("-password").sort({ createdAt: -1 }).skip((currentPage - 1) * safeLimit).limit(safeLimit),
            Tutor.countDocuments(query)
        ]);
        res.json({ tutors, total, currentPage, totalPages: Math.ceil(total / safeLimit) });
    } catch (error) { next(error); }
});

module.exports = router;
