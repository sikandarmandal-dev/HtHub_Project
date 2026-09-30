const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ success: false, message: 'Please sign in to continue.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user || !user.isActive) return res.status(401).json({ success: false, message: 'Your account is unavailable.' });
    req.user = user; next();
  } catch (_error) { return res.status(401).json({ success: false, message: 'Your session has expired. Please sign in again.' }); }
}
const allow = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ success: false, message: 'You do not have access to this feature.' });
module.exports = { authenticate, allow };
