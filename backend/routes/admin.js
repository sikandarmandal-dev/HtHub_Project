const router = require('express').Router();
const User = require('../models/userSchema');
const TutorProfile = require('../models/TutorProfile');
const TutorRequest = require('../models/TutorRequest');
const Review = require('../models/Review');
const { authenticate, allow } = require('../middleware/auth');
router.use(authenticate, allow('admin'));
router.get('/stats', async (_req, res, next) => {
  try {
    const [users, students, tutors, pendingVerifications, requests] = await Promise.all([User.countDocuments({ isActive: true }), User.countDocuments({ role: 'student', isActive: true }), User.countDocuments({ role: 'tutor', isActive: true }), TutorProfile.countDocuments({ verificationStatus: 'pending' }), TutorRequest.countDocuments()]);
    res.json({ success: true, data: { users, students, tutors, pendingVerifications, requests } });
  } catch (err) { next(err); }
});
router.get('/users', async (req, res, next) => {
  try { const page = Math.max(1, Number(req.query.page) || 1), limit = Math.min(100, Number(req.query.limit) || 30); const filter = req.query.role ? { role: req.query.role } : {}; const [users, total] = await Promise.all([User.find(filter).select('-password').sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit), User.countDocuments(filter)]); res.json({ success: true, data: { users, total, page, pages: Math.ceil(total/limit) } }); } catch (err) { next(err); }
});
router.get('/verifications', async (_req, res, next) => {
  try { res.json({ success: true, data: await TutorProfile.find({ verificationStatus: 'pending' }).populate('userId', 'name email phone createdAt').sort({ createdAt: 1 }) }); } catch (err) { next(err); }
});
router.patch('/tutors/:id/verification', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['verified', 'rejected'].includes(status)) return res.status(400).json({ success: false, message: 'Status must be verified or rejected.' });
    const profile = await TutorProfile.findByIdAndUpdate(req.params.id, { verificationStatus: status }, { returnDocument: 'after' });
    if (!profile) return res.status(404).json({ success: false, message: 'Tutor profile not found.' });
    await User.findByIdAndUpdate(profile.userId, { isVerified: status === 'verified' });
    res.json({ success: true, message: `Tutor ${status}.`, data: profile });
  } catch (err) { next(err); }
});
router.patch('/users/:id/active', async (req, res, next) => {
  try { if (String(req.user._id) === req.params.id) return res.status(400).json({ success: false, message: 'You cannot deactivate your own admin account.' }); const user = await User.findByIdAndUpdate(req.params.id, { isActive: Boolean(req.body.isActive) }, { returnDocument: 'after' }).select('-password'); if (!user) return res.status(404).json({ success: false, message: 'User not found.' }); res.json({ success: true, message: 'Account status updated.', data: user }); } catch (err) { next(err); }
});
router.delete('/users/:id', async (req, res, next) => {
  try { if (String(req.user._id) === req.params.id) return res.status(400).json({ success: false, message: 'You cannot delete your own admin account.' }); await Promise.all([User.findByIdAndDelete(req.params.id), TutorProfile.deleteOne({ userId: req.params.id }), require('../models/StudentProfile').deleteOne({ userId: req.params.id }), TutorRequest.deleteMany({ $or: [{ studentId: req.params.id }, { tutorId: req.params.id }] }), Review.deleteMany({ $or: [{ studentId: req.params.id }, { tutorId: req.params.id }] })]); res.json({ success: true, message: 'Account and related records removed.' }); } catch (err) { next(err); }
});
router.get('/requests', async (_req, res, next) => {
  try { res.json({ success: true, data: await TutorRequest.find().populate('studentId', 'name email').populate('tutorId', 'name email').sort({ createdAt: -1 }).limit(200) }); } catch (err) { next(err); }
});
module.exports = router;
