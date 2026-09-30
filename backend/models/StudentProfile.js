const mongoose = require('mongoose');
module.exports = mongoose.model('StudentProfile', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  class: { type: String, default: '' }, subjects: [{ type: String, trim: true }],
  preferredLocation: { city: { type: String, default: '' }, area: { type: String, default: '' } },
  preferredTeachingMode: { type: String, enum: ['in-person', 'online', 'both'], default: 'both' },
  requirements: { type: String, default: '', maxlength: 2000 }
}, { timestamps: true }));
