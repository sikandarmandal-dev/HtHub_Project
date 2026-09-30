const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, trim: true, default: '' }, role: { type: String, enum: ['student', 'tutor', 'admin'], default: 'student', required: true },
  profileImage: { type: String, default: '' }, location: { city: { type: String, default: '' }, area: { type: String, default: '' } },
  isVerified: { type: Boolean, default: false }, isActive: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
