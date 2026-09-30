const mongoose = require('mongoose');
module.exports = mongoose.model('TutorProfile', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  qualification: { type: String, required: true, trim: true }, experience: { type: Number, min: 0, required: true },
  subjects: { type: [String], required: true }, classes: { type: [String], required: true },
  location: { city: { type: String, required: true, trim: true }, area: { type: String, default: '' } },
  coordinates: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: undefined } },
  teachingMode: { type: String, enum: ['in-person', 'online', 'both'], default: 'in-person' }, hourlyRate: { type: Number, min: 0, required: true },
  availability: [{ type: String }], bio: { type: String, default: '', maxlength: 2000 }, profileImage: { type: String, default: '' },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending', index: true }, rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true }));
