const router = require('express').Router();
const Review = require('../models/Review');
const TutorRequest = require('../models/TutorRequest');
const TutorProfile = require('../models/TutorProfile');
const { authenticate, allow } = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const limit = Math.min(12, Math.max(1, Number(req.query.limit) || 6));
    const reviews = await Review.find().populate('studentId', 'name profileImage').populate('tutorId', 'name').sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ success: true, data: reviews });
  } catch (err) { next(err); }
});

router.post('/', authenticate, allow('student'), async (req, res, next) => {
  try {
    const { requestId, rating, comment } = req.body;
    const numericRating = Number(rating);
    if (!requestId || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5 || !String(comment || '').trim()) return res.status(400).json({ success: false, message: 'Choose a rating from 1 to 5 and write a short review.' });
    const request = await TutorRequest.findOne({ _id: requestId, studentId: req.user._id, status: 'completed' });
    if (!request) return res.status(400).json({ success: false, message: 'You can review a tutor after a completed tutoring request.' });
    const review = await Review.create({ requestId, studentId: req.user._id, tutorId: request.tutorId, rating: numericRating, comment: String(comment).trim() });
    const aggregate = await Review.aggregate([{ $match: { tutorId: request.tutorId } }, { $group: { _id: '$tutorId', average: { $avg: '$rating' } } }]);
    await TutorProfile.findOneAndUpdate({ userId: request.tutorId }, { rating: aggregate[0]?.average || 0 });
    res.status(201).json({ success: true, message: 'Thanks for sharing your experience.', data: review });
  } catch (err) { next(err); }
});
module.exports = router;
