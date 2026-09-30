const mongoose = require('mongoose');
module.exports = mongoose.model('Review', new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'TutorRequest', required: true, unique: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true, required: true, maxlength: 600 }
}, { timestamps: true }));
