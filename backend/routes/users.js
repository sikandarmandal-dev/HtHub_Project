const router = require('express').Router();
const User = require('../models/userSchema');
const StudentProfile = require('../models/StudentProfile');
const TutorProfile = require('../models/TutorProfile');
const { authenticate, allow } = require('../middleware/auth');
const { normalizeProfile } = require('./profileUtils');
const cloudinary = require('cloudinary').v2;
router.use(authenticate);
router.post('/me/image', async (req, res, next) => {
  try {
    const { image } = req.body;
    if (!image || !/^data:image\/(png|jpe?g|webp);base64,/.test(image) || image.length > 5 * 1024 * 1024) return res.status(400).json({ success: false, message: 'Choose a PNG, JPEG, or WebP image under 4 MB.' });
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) return res.status(503).json({ success: false, message: 'Image uploads are not configured yet.' });
    cloudinary.config({ cloud_name: CLOUDINARY_CLOUD_NAME, api_key: CLOUDINARY_API_KEY, api_secret: CLOUDINARY_API_SECRET });
    const uploaded = await cloudinary.uploader.upload(image, { folder: 'hometutor/profiles', resource_type: 'image', transformation: [{ width: 600, height: 600, crop: 'fill', gravity: 'face' }] });
    req.user.profileImage = uploaded.secure_url;
    await req.user.save();
    if (req.user.role === 'tutor') await TutorProfile.findOneAndUpdate({ userId: req.user._id }, { profileImage: uploaded.secure_url });
    res.json({ success: true, message: 'Profile image updated.', data: { url: uploaded.secure_url } });
  } catch (err) { next(err); }
});
router.patch('/me', async (req, res, next) => {
  try {
    const { name, phone, location, profileImage } = req.body;
    if (name !== undefined) req.user.name = String(name).trim();
    if (phone !== undefined) req.user.phone = String(phone).trim();
    if (location !== undefined) req.user.location = typeof location === 'string' ? { city: location, area: '' } : { city: location.city || '', area: location.area || '' };
    if (profileImage !== undefined) req.user.profileImage = profileImage;
    await req.user.save();
    let profile = null;
    if (req.user.role === 'student' && req.body.profile) {
      const student = req.body.profile;
      if (!String(student.class || '').trim() || !Array.isArray(student.subjects) || !student.subjects.length || !String(student.preferredLocation?.city || '').trim()) return res.status(400).json({ success: false, message: 'Add a class, at least one subject, and your preferred city.' });
      profile = await StudentProfile.findOneAndUpdate({ userId: req.user._id }, { ...student, userId: req.user._id }, { returnDocument: 'after', upsert: true, runValidators: true });
    }
    if (req.user.role === 'tutor' && req.body.profile) profile = await TutorProfile.findOneAndUpdate({ userId: req.user._id }, { ...normalizeProfile(req.body.profile), userId: req.user._id, verificationStatus: 'pending' }, { returnDocument: 'after', upsert: true, runValidators: true });
    res.json({ success: true, message: 'Profile updated.', data: { user: req.user, profile } });
  } catch (err) { next(err); }
});
router.get('/me/profile', async (req, res, next) => {
  try {
    const Model = req.user.role === 'tutor' ? TutorProfile : StudentProfile;
    if (req.user.role === 'admin') return res.status(400).json({ success: false, message: 'Admins do not have a student or tutor profile.' });
    res.json({ success: true, data: await Model.findOne({ userId: req.user._id }) });
  } catch (err) { next(err); }
});
router.patch('/me/profile', allow('student', 'tutor'), async (req, res, next) => {
  try {
    const Model = req.user.role === 'tutor' ? TutorProfile : StudentProfile;
    const changes = req.user.role === 'tutor' ? normalizeProfile(req.body) : req.body;
    if (req.user.role === 'student' && (!String(changes.class || '').trim() || !Array.isArray(changes.subjects) || !changes.subjects.length || !String(changes.preferredLocation?.city || '').trim())) return res.status(400).json({ success: false, message: 'Add a class, at least one subject, and your preferred city.' });
    const data = await Model.findOneAndUpdate({ userId: req.user._id }, { ...changes, userId: req.user._id, ...(req.user.role === 'tutor' ? { verificationStatus: 'pending' } : {}) }, { returnDocument: 'after', upsert: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ success: true, message: 'Profile saved.', data });
  } catch (err) { next(err); }
});
module.exports = router;
