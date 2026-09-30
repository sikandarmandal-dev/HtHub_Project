const router = require('express').Router();
const User = require('../models/userSchema');
const TutorProfile = require('../models/TutorProfile');
const { authenticate, allow } = require('../middleware/auth');
const { scoreTutor } = require('../services/recommendations');
const { normalizeProfile } = require('./profileUtils');
const escape = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
router.get('/', async (req, res, next) => {
  try {
    const { subject, class: grade, location, experience, qualification, teachingMode, minRate, maxRate, availability, sort = 'relevance', page = 1, limit = 9 } = req.query;
    const filter = { verificationStatus: 'verified' };
    if (subject) filter.subjects = { $in: [new RegExp(escape(subject), 'i')] };
    if (grade) filter.classes = { $in: [new RegExp(`^${escape(grade)}$`, 'i')] };
    if (location) filter.$or = [{ 'location.city': new RegExp(escape(location), 'i') }, { 'location.area': new RegExp(escape(location), 'i') }];
    if (experience) filter.experience = { $gte: Number(experience) };
    if (qualification) filter.qualification = new RegExp(escape(qualification), 'i');
    if (teachingMode && teachingMode !== 'both') filter.teachingMode = { $in: [teachingMode, 'both'] };
    if (minRate || maxRate) filter.hourlyRate = { ...(minRate ? { $gte: Number(minRate) } : {}), ...(maxRate ? { $lte: Number(maxRate) } : {}) };
    if (availability) filter.availability = { $in: [new RegExp(escape(availability), 'i')] };
    const p = Math.max(1, Number(page) || 1), n = Math.min(30, Math.max(1, Number(limit) || 9));
    const ordering = sort === 'price-asc' ? { hourlyRate: 1 } : sort === 'price-desc' ? { hourlyRate: -1 } : sort === 'experience' ? { experience: -1 } : { rating: -1, experience: -1 };
    const [profiles, total] = await Promise.all([TutorProfile.find(filter).populate('userId', 'name profileImage location isVerified').sort(ordering).skip((p-1)*n).limit(n).lean(), TutorProfile.countDocuments(filter)]);
    const tutors = profiles.map((profile) => ({ ...profile, user: profile.userId, userId: undefined }));
    res.json({ success: true, data: { tutors, pagination: { page: p, limit: n, total, pages: Math.ceil(total/n) } } });
  } catch (err) { next(err); }
});
router.get('/recommendations', authenticate, allow('student'), async (req, res, next) => {
  try {
    const StudentProfile = require('../models/StudentProfile');
    const student = await StudentProfile.findOne({ userId: req.user._id }).lean();
    const tutors = await TutorProfile.find({ verificationStatus: 'verified' }).populate('userId', 'name profileImage location isVerified').lean();
    const recommendations = tutors.map((profile) => ({ ...profile, user: profile.userId, userId: undefined, matchScore: scoreTutor(profile, student || {}) })).sort((a,b) => b.matchScore - a.matchScore).slice(0, 12);
    res.json({ success: true, data: recommendations });
  } catch (err) { next(err); }
});
router.get('/mine', authenticate, allow('tutor'), async (req, res, next) => {
  try { res.json({ success: true, data: await TutorProfile.findOne({ userId: req.user._id }) }); } catch (err) { next(err); }
});
router.put('/mine', authenticate, allow('tutor'), async (req, res, next) => {
  try { const profile = await TutorProfile.findOneAndUpdate({ userId: req.user._id }, { ...normalizeProfile(req.body), userId: req.user._id, verificationStatus: 'pending' }, { returnDocument: 'after', upsert: true, runValidators: true }); res.json({ success: true, message: 'Tutor profile saved and sent for verification.', data: profile }); } catch (err) { next(err); }
});
router.get('/:id', async (req, res, next) => {
  try { const tutor = await TutorProfile.findOne({ _id: req.params.id, verificationStatus: 'verified' }).populate('userId', 'name profileImage location phone isVerified'); if (!tutor) return res.status(404).json({ success: false, message: 'Tutor not found.' }); res.json({ success: true, data: tutor }); } catch (err) { next(err); }
});
module.exports = router;
