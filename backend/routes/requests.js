const router = require('express').Router();
const TutorRequest = require('../models/TutorRequest');
const TutorProfile = require('../models/TutorProfile');
const StudentProfile = require('../models/StudentProfile');
const Review = require('../models/Review');
const { authenticate, allow } = require('../middleware/auth');
router.use(authenticate);
router.get('/mine', allow('student', 'tutor'), async (req, res, next) => {
  try {
    const query = req.user.role === 'student' ? { studentId: req.user._id } : { tutorId: req.user._id };
    const requests = await TutorRequest.find(query).populate('studentId', 'name email profileImage').populate('tutorId', 'name email profileImage').sort({ updatedAt: -1 });
    const reviewedIds = req.user.role === 'student' ? new Set((await Review.find({ studentId: req.user._id }).select('requestId')).map((item) => String(item.requestId))) : new Set();
    res.json({ success: true, data: requests.map((item) => ({ ...item.toObject(), reviewed: reviewedIds.has(String(item._id)) })) });
  } catch (err) { next(err); }
});
router.post('/', allow('student'), async (req, res, next) => {
  try {
    const { tutorId, subject, class: grade, message = '' } = req.body;
    const tutor = await TutorProfile.findOne({ userId: tutorId, verificationStatus: 'verified' });
    if (!tutor) return res.status(404).json({ success: false, message: 'This tutor is unavailable.' });
    const active = await TutorRequest.findOne({ studentId: req.user._id, tutorId, status: { $in: ['pending', 'accepted'] } });
    if (active) return res.status(409).json({ success: false, message: 'You already have an active request with this tutor.' });
    const student = await StudentProfile.findOne({ userId: req.user._id });
    const request = await TutorRequest.create({ studentId: req.user._id, tutorId, subject, class: grade, message, location: student?.preferredLocation });
    res.status(201).json({ success: true, message: 'Request sent to the tutor.', data: request });
  } catch (err) { next(err); }
});
router.patch('/:id/status', allow('student', 'tutor'), async (req, res, next) => {
  try {
    const request = await TutorRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found.' });
    const { status } = req.body;
    const isStudentOwner = request.studentId.equals(req.user._id);
    const isTutorOwner = request.tutorId.equals(req.user._id);
    const transitions = isStudentOwner ? { pending: ['cancelled'] } : isTutorOwner ? { pending: ['accepted', 'rejected'], accepted: ['completed'] } : {};
    if (!transitions[request.status]?.includes(status)) return res.status(403).json({ success: false, message: 'That status change is not allowed.' });
    request.status = status; await request.save();
    res.json({ success: true, message: 'Request updated.', data: request });
  } catch (err) { next(err); }
});
module.exports = router;
