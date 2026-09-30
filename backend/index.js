const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000').split(',').map((v) => v.trim());
app.use(cors({ origin: (origin, cb) => !origin || allowedOrigins.includes(origin) ? cb(null, true) : cb(new Error('Origin not allowed by CORS')), credentials: true }));
app.use(express.json({ limit: '6mb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' } }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tutors', require('./routes/tutors'));
app.use('/api/requests', require('./routes/requests'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));
app.use((_req, res) => res.status(404).json({ success: false, message: 'Endpoint not found.' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || (err.name === 'ValidationError' ? 400 : err.code === 11000 ? 409 : 500);
  res.status(status).json({ success: false, message: status === 500 ? 'Something went wrong. Please try again.' : err.message, errors: err.errors || undefined });
});

const port = process.env.PORT || 8080;
if (require.main === module) {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required. Copy .env.example to .env and configure it.');
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must contain at least 32 characters.');
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(port, () => console.log(`HomeTutor API listening on ${port}`)))
    .catch((err) => { console.error('Could not connect to MongoDB:', err.message); process.exit(1); });
}
module.exports = app;
