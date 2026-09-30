const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const StudentProfile = require('../models/StudentProfile');
const TutorProfile = require('../models/TutorProfile');
const { authenticate } = require('../middleware/auth');
const { normalizeProfile } = require('./profileUtils');
const safeUser = (u) => ({ id: u._id, name: u.name, email: u.email, phone: u.phone, role: u.role, profileImage: u.profileImage, location: u.location, isVerified: u.isVerified });
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role = 'student', phone = '', profile } = req.body;
    if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') || !/^\+?[\d\s()-]{7,20}$/.test(phone.trim()) || !password || !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) return res.status(400).json({ success: false, message: 'Enter your name, a valid email and phone number, and a password with at least 8 characters including a number.' });
    if (!['student', 'tutor'].includes(role)) return res.status(400).json({ success: false, message: 'Choose student or tutor registration.' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12), phone, role });
    try {
      if (role === 'student') await StudentProfile.create({ userId: user._id });
      else if (profile) await TutorProfile.create({ userId: user._id, ...normalizeProfile(profile) });
    } catch (err) { await User.findByIdAndDelete(user._id); throw err; }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, message: 'Your account is ready.', data: { token, user: safeUser(user) } });
  } catch (err) { next(err); }
});
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() }).select('+password');
    if (!user || !user.isActive || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ success: false, message: 'Email or password is incorrect.' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, message: 'Welcome back.', data: { token, user: safeUser(user) } });
  } catch (err) { next(err); }
});
router.get('/me', authenticate, async (req, res) => {
  const Model = req.user.role === 'tutor' ? TutorProfile : StudentProfile;
  const profile = req.user.role === 'admin' ? null : await Model.findOne({ userId: req.user._id });
  res.json({ success: true, data: { user: safeUser(req.user), profile } });
});
module.exports = router;
