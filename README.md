# HomeTutor

HomeTutor is a role-based home tutoring marketplace built with React, Express, and MongoDB. Students can discover verified tutors, maintain learning requirements, and track tutor requests. Tutors can publish a profile and manage incoming requests. Admins review tutor verification and manage accounts.

## Features

- Student, tutor, and admin accounts with JWT authentication, bcrypt password hashing, and role-protected API and UI routes.
- Student and tutor profile management, including profile image upload through Cloudinary.
- Tutor search by subject, grade, city/area, experience, qualification, teaching mode, availability, rate, sorting, and database pagination.
- Rule-based tutor recommendations with matching logic kept in `backend/services/recommendations.js`.
- Tutor request lifecycle: pending, accepted, rejected, cancelled, and completed. Duplicate pending/accepted requests are prevented.
- Public student reviews can be submitted only after a completed tutoring request; tutor ratings update from genuine review records.
- Admin dashboard statistics, account activation, tutor verification, and request review.
- Responsive public pages and dashboards with loading, error, and empty states.

## Technology and layout

- Frontend: React 19, Vite, React Router, Axios, modern CSS.
- Backend: Node.js, Express 5, Mongoose, MongoDB, JWT, bcryptjs, Helmet, express-rate-limit.
- Images: Cloudinary (optional until credentials are configured).
- Deploy: static frontend on Vercel or Netlify; API on Render; MongoDB Atlas.

```text
backend/
  index.js                 Express app and production server
  middleware/auth.js       JWT authentication and role checks
  models/                  User, student profile, tutor profile, request
  routes/                  Auth, profile, tutor, request, admin APIs
  services/recommendations.js
  scripts/seedAdmin.js
frontend/client/
  index.html               Vite HTML entry point
  vite.config.js           React/Vite configuration
  src/App.jsx              Route table
  src/context/             Authentication state
  src/pages/ProductPages.js Public pages and dashboard screens
  src/services/api.js      Axios API client
```

## Data models

- **User** stores account identity, password hash, role, contact/profile data, verification, and active status.
- **StudentProfile** stores grade, subjects, preferred location/mode, and requirements.
- **TutorProfile** stores qualifications, experience, subjects/classes, city/area, rate, availability, teaching mode, bio, image, verification status, and optional GeoJSON point coordinates for future proximity search.
- **TutorRequest** references student and tutor users and stores subject, grade, message, location, and lifecycle status.
- **Review** references exactly one completed tutoring request, student, and tutor, and stores the public rating and comment. Tutor average ratings are updated when reviews are submitted.

Passwords are excluded from normal User queries. Public tutor listings expose only verified profiles.

## API overview

All successful responses use `{ "success": true, "data": ... }`; errors use `{ "success": false, "message": ... }`. Protected routes take `Authorization: Bearer <token>`.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a student or tutor account |
| POST | `/api/auth/login` | Public | Sign in and receive JWT |
| GET | `/api/auth/me` | Signed in | Current user and profile |
| PATCH | `/api/users/me` | Signed in | Update account and profile |
| POST | `/api/users/me/image` | Signed in | Upload a profile photo to Cloudinary |
| GET | `/api/tutors` | Public | Search/filter/sort/page verified tutors |
| GET | `/api/tutors/:id` | Public | Tutor profile details |
| GET | `/api/tutors/recommendations` | Student | Rule-based recommendations |
| GET/POST | `/api/requests/mine`, `/api/requests` | Student/tutor | List or create tutor requests |
| PATCH | `/api/requests/:id/status` | Request owner | Change request status where permitted |
| GET/POST | `/api/reviews` | Public / completed-request student | List published reviews or review a completed session |
| GET | `/api/admin/stats` | Admin | Platform counts |
| GET | `/api/admin/users` | Admin | Paginated user list |
| GET | `/api/admin/verifications` | Admin | Tutor verification queue |
| PATCH | `/api/admin/tutors/:id/verification` | Admin | Verify or reject tutor |
| PATCH/DELETE | `/api/admin/users/:id` | Admin | Activate/deactivate or remove account |
| GET | `/api/admin/requests` | Admin | Review requests |
| GET | `/api/health` | Public | API and MongoDB health |

Tutor query example: `/api/tutors?subject=Mathematics&class=10&location=Deoghar&page=1&limit=9&maxRate=500`. Query values are applied in MongoDB; maximum page size is 30.

## Local setup

Requirements: Node.js 20.19+ and a MongoDB database (local or Atlas).

1. Copy `backend/.env.example` to `backend/.env`; set `MONGODB_URI` and a long random `JWT_SECRET`.
2. Set `CLIENT_URL=http://localhost:3000` for local development.
3. In `backend`, run `npm install`, then `npm run dev` (or `npm start`). The API listens on port 8080 by default.
4. In `frontend/client`, run `npm install`, copy `.env.example` to `.env`, then run `npm run dev`.
5. Open `http://localhost:3000`.

Create the first administrator explicitly after configuring `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the backend environment:

```sh
cd backend
npm run seed:admin
```

The seed command creates or resets the admin account to the configured password. Do not use the example password outside local setup.

## MongoDB Atlas

Create a database user with a strong password, allow only the deployment network addresses needed by your API, and copy the Atlas connection string to `MONGODB_URI`. Replace its user, password, cluster, and database name. Never put this URI in frontend configuration or commit `.env` files.

## Cloudinary image uploads

Create a Cloudinary account and set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` in the backend environment. If these are absent, profile image upload returns a clear configuration message and other features continue to work. Uploads accept PNG, JPEG, or WebP images up to approximately 4 MB.

## Deployment

### Render API

- Create a Web Service from this repository with root directory `backend`.
- Build command: `npm install`; start command: `npm start`.
- Set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` (the exact deployed frontend origin). Set Cloudinary values if image uploads are needed.
- Render supplies `PORT`; the API uses it automatically.
- Run `npm run seed:admin` once from a trusted environment to create the admin account.

### Vercel or Netlify frontend

- Set the project root to `frontend/client` and build command to `npm run build`; output directory is `dist`.
- Set `VITE_API_URL` to the deployed API base, for example `https://your-api.onrender.com/api`, then rebuild.
- `vercel.json` and `public/_redirects` configure single-page route fallback for Vercel and Netlify.
- Add the deployed frontend origin to backend `CLIENT_URL` and redeploy the API.

## Verification checklist

Use real MongoDB and a configured Cloudinary account to verify the complete deployment:

- [ ] Student and tutor registration; duplicate emails and invalid input are rejected.
- [ ] Login, current-user loading, logout, expired/invalid JWT handling, and role boundaries.
- [ ] Student and tutor profiles persist correctly; image upload saves a Cloudinary URL.
- [ ] Tutor verification controls public discoverability.
- [ ] Search filters, sort options, pagination, and empty/error states.
- [ ] Student request creation, duplicate prevention, cancellation, and status refresh.
- [ ] Tutor accept/reject/completion transitions and request history.
- [ ] Recommendations respond to student subjects, grade, and location.
- [ ] Admin statistics, verification, deactivation, deletion, and request list.
- [ ] Responsive layout at mobile, tablet, and desktop widths.
- [ ] Production frontend origin, API URL, CORS, and Atlas connection.

## Current scope notes

Authentication uses bearer tokens held in browser local storage. For higher-risk production deployments, consider migrating to secure, same-site HTTP-only cookies and adding refresh-token rotation. Recommendation scores are rule-based, not machine learning. City/area matching is text-based; coordinate fields are reserved for a future geospatial index. In-app notifications, email, tutor reviews, and chat are not part of this implementation. Admin account creation is intentionally restricted to the seed script.
