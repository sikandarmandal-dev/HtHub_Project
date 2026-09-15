const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
    subject: { type: String, required: true, trim: true },
    preferredDate: { type: Date, required: true },
    message: { type: String, trim: true, maxlength: 1000 },
    status: { type: String, enum: ["pending", "accepted", "declined", "completed", "cancelled"], default: "pending" }
}, { timestamps: true });

bookingSchema.index({ student: 1, createdAt: -1 });
bookingSchema.index({ tutor: 1, status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
