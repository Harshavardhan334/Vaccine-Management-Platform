

# Vaccine Management Platform

> A modern full-stack web application for managing vaccines, diseases, and appointments, featuring an agentic chatbot for intelligent user support.

---

## 🚀 Features

- **User Authentication & Roles**: Secure login and registration for Admin and Resident roles, with JWT-based session management.
- **Vaccine & Disease Management**: Residents can request new vaccines/diseases; Admins review, approve, and manage all records.
- **Appointment Scheduling**: Residents schedule, reschedule, cancel, and complete vaccine appointments (future dates only).
- **Approval Workflows**: All new vaccine/disease requests require admin approval before being available to users.
- **Search & Filter**: Residents can search vaccines by location and filter available options.
- **Notification System**: Users receive notifications for important actions (e.g., approvals, appointment status changes).
- **Agentic Chatbot**: An intelligent, context-aware chatbot assists users with platform navigation, vaccine/disease info, and general queries.
- **Role-Based Access Control**: Actions and routes are protected based on user roles.
- **Modern UI**: Responsive, user-friendly interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)

---

## 📁 Folder Structure

```
Vaccine-Management-Platform/
├── backend/         # Express.js backend API
│   ├── Controllers/
│   ├── Database/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── app.js
│   ├── server.js
│   └── ...
├── frontend/        # React frontend app
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── ...
├── package.json     # Project metadata
└── README.md        # Project documentation
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)

### Backend Setup
```sh
cd backend
npm install
cp config/config.example.env config/config.env # Edit values as needed
# (Optional) Seed the database:
node seed.js
npm run dev
```

**Required `backend/config/config.env` values:**
```
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRE=10d
COOKIE_EXPIRE=5
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧑‍💻 Usage

- Register as a Resident or login as Admin.
- Residents can request new vaccines/diseases, schedule appointments, and interact with the agentic chatbot for help.
- Admins review/approve requests and manage all records.
- Use the chatbot (`/chatbot` route) for intelligent, context-aware assistance.

---

## 📚 API Overview (Selected)

- **Users:**
  - `POST /api/users` (register)
  - `POST /api/users/login`
  - `POST /api/users/logout`
  - `PUT /api/users` (self update)
- **Resident:**
  - `POST /api/resident/diseases` (request)
  - `POST /api/resident/vaccines` (request)
  - `GET /api/resident/vaccines/location/:location` (search)
  - `GET /api/resident/vaccines` (list approved vaccines)
  - `POST /api/resident/appointments` (create)
  - `GET /api/resident/appointments` (list my appointments)
  - `PUT /api/resident/appointments/:id` (reschedule)
  - `DELETE /api/resident/appointments/:id` (cancel)
  - `PUT /api/resident/appointments/:id/status` (update status)
- **Admin:**
  - `GET /api/admin/diseases/requests`, `PUT /api/admin/diseases/approve/:id`
  - `GET /api/admin/vaccines/requests`, `PUT /api/admin/vaccines/approve/:id`
  - `PUT /api/admin/diseases/:id`, `PUT /api/admin/vaccines/:id`

---

## 🖥️ UI Overview

- **Resident:**
  - Search: `/resident/search` – find vaccines by location
  - Appointments: `/resident/appointments` – schedule, reschedule, cancel, mark completed
  - Home: `/` – view Upcoming, Completed, and Canceled appointments
  - Chatbot: `/chatbot` – access the agentic chatbot for help, guidance, and platform information
- **Admin:**
  - Dashboard: `/admin` – manage requests, diseases, and vaccines

---

## 📜 Scripts

- **Backend:** `npm run dev` (nodemon), `npm start`
- **Frontend:** `npm run dev`, `npm run build`, `npm run preview`

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).
