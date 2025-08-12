# Vaccine Management Platform

Full-stack MERN app for disease and vaccine tracking with role-based access (Resident/Admin), approval workflows, and cookie-based JWT auth.

## Features
- Auth and roles: Resident and Admin, cookie JWT, protected routes
- Resident
  - Submit disease and vaccine requests
  - Search vaccines by location
  - Schedule vaccine appointments (enforced to dates after today)
  - Reschedule (sets status back to scheduled), cancel, and mark as completed
  - View Upcoming, Completed, and Canceled appointments on Home
- Admin
  - Review/approve disease and vaccine requests
  - Manage diseases (affected areas) and vaccines (covered diseases)

## Tech Stack
- Frontend: React, React Router, Tailwind CSS, Axios, Vite
- Backend: Node, Express, Mongoose, CORS, cookie-parser, dotenv, JWT
- DB: MongoDB

## Local Setup
Prereqs: Node 18+, MongoDB Atlas URI

1) Backend
```bash
cd backend
npm install
cp config/config.env.example config/config.env # or set your own values
npm run dev
```

Required `backend/config/config.env` values:
```
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=10d
COOKIE_EXPIRE=5
```

2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Overview (selected)
- Users: `POST /api/users` (register), `POST /api/users/login`, `POST /api/users/logout`, `PUT /api/users` (self update)
- Resident (auth, role resident):
  - `POST /api/resident/diseases` (request)
  - `POST /api/resident/vaccines` (request)
  - `GET /api/resident/vaccines/location/:location` (search)
  - `GET /api/resident/vaccines` (list approved vaccines)
  - `POST /api/resident/appointments` (create; date must be after today)
  - `GET /api/resident/appointments` (list my appointments)
  - `PUT /api/resident/appointments/:id` (reschedule; sets status to scheduled, date must be after today)
  - `DELETE /api/resident/appointments/:id` (cancel; sets status to canceled)
  - `PUT /api/resident/appointments/:id/status` (update status: scheduled | completed | canceled)
- Admin (auth, role admin):
  - Requests: `GET /api/admin/diseases/requests`, `PUT /api/admin/diseases/approve/:id`
  - Requests: `GET /api/admin/vaccines/requests`, `PUT /api/admin/vaccines/approve/:id`
  - Manage: `PUT /api/admin/diseases/:id`, `PUT /api/admin/vaccines/:id`

## UI Overview (selected)
- Resident
  - Search: `/resident/search` – find vaccines by location
  - Appointments: `/resident/appointments` – schedule, reschedule (modal), cancel, mark completed
  - Home: `/` – shows Upcoming, Completed, and Canceled appointments

## Scripts
- Backend: `npm run dev` (nodemon), `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`

## Contributing
PRs are welcome. Please open an issue to discuss significant changes.

## License
MIT

