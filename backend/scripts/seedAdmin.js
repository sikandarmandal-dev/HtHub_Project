require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
(async () => {
  if (!process.env.MONGODB_URI || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error('Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD before seeding.');
  await mongoose.connect(process.env.MONGODB_URI);
  const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
  await User.findOneAndUpdate({ email }, { name: process.env.ADMIN_NAME || 'HomeTutor Admin', email, role: 'admin', isVerified: true, isActive: true, password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) }, { upsert: true, returnDocument: 'after', runValidators: true });
  console.log(`Admin account configured for ${email}`);
  await mongoose.disconnect();
})().catch((err) => { console.error(err.message); process.exit(1); });
