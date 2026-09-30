const mongoose = require('mongoose');
module.exports = mongoose.model('TutorRequest', new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, trim: true }, class: { type: String, required: true, trim: true },
  message: { type: String, default: '', maxlength: 2000 }, location: { city: String, area: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'], default: 'pending', index: true }
}, { timestamps: true }));
