# Chamakkala Travels ✈️ 🌍

A modern, MERN-stack web application for **Chamakkala Travels**—a localized travel agency based in **Neendoor, Kottayam, Kerala, India**. 

The portal facilitates interactive travel plan inquiries and real-time transit fare updates for customers, backed by a secure, robust admin panel for agency operators.

---

## 🚀 Key Features

* **Live Fares Board:** Real-time display of the latest promotional flight, train, and bus ticket fares, categorized and sorted by most recent.
* **Bespoke Trip Inquiry System:** Detailed multi-step planning form allowing users to submit custom destinations, travel classes, passenger counts, budgets, and specific remarks.
* **Secure Admin Dashboard:** A protected administrative pipeline (`/admin`) for agency staff to:
  * Trace, filter, and track customer inquiries.
  * Manage lead pipelines with status indicators (`New`, `In Progress`, `Completed`).
  * Instantly publish new live fare deals directly onto the homepage.
* **Interactive Locators:** Gray-scale to vibrant color animated Google Maps office map integration, pinpointing the Kottayam office on the Ettumanoor - Neendoor Road.
* **Instant WhatsApp Chat Widget:** Embedded floating contact widget linked directly to the agency's official customer care number (+91 94956 84965).

---

## 🛠️ Technology Stack

### Frontend
* **React 19 & Vite 8:** High-performance, reactive UI development.
* **Tailwind CSS v4:** Modern, custom utility styling (midnight dark-blue aesthetic).
* **Framer Motion 12:** Smooth, premium micro-animations and entrance transitions.
* **Lucide React:** Sleek, consistent iconography.
* **React Router Dom v7:** Declarative client-side routing.

### Backend & Database
* **Node.js & Express 5:** Robust API middleware & server architecture.
* **MongoDB & Mongoose 9:** NoSQL document database and advanced Object Data Modeling.
* **JSON Web Tokens (JWT) & BcryptJS:** High-security password encryption and stateless authorization.

---

## 📂 Project Structure

```text
Chamakala-Travels/
├── client/                     # Frontend Vite + React project
│   ├── src/
│   │   ├── assets/             # Images and static design vectors
│   │   ├── components/         # Shared components (Hero, FareCards, InquiryForm, Navbar, etc.)
│   │   ├── layouts/            # Page layouts (MainLayout with active Outlet)
│   │   ├── pages/              # Main view routes (Home, Fares, Destinations, AdminDashboard, Login)
│   │   ├── App.jsx             # Main Router structure
│   │   └── index.css           # Global CSS variables & Tailwind directives
│   └── package.json
│
├── server/                     # Backend Node + Express project
│   ├── middleware/             # JWT Authentication middlewares
│   ├── models/                 # Mongoose schemas (Admin, Fare, Inquiry)
│   ├── routes/                 # Express REST routers (auth, fares, inquiries)
│   ├── scripts/                # Utility scripts (database seeding)
│   ├── server.js               # Application bootstrap entry point
│   └── package.json
│
└── .gitignore                  # Root git exclusion file (excludes node_modules, .env, and logs)
```

---

## 🔗 API Endpoint Reference

All endpoints are prefixed with `/api`. Protected routes require a valid `Bearer <JWT_TOKEN>` header.

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Public | Authenticates admin credentials, returns a JWT. |
| **GET** | `/api/fares` | Public | Retrieves all live travel fares sorted by date. |
| **POST** | `/api/fares` | **Admin Only** | Adds a new promotional ticket fare. |
| **POST** | `/api/inquiries` | Public | Submits a customer trip inquiry. |
| **GET** | `/api/inquiries` | **Admin Only** | Fetches the list of all customer inquiries. |
| **PUT** | `/api/inquiries/:id/status` | **Admin Only** | Updates an inquiry's status (`New`/`In Progress`/`Completed`). |
| **GET** | `/api/health` | Public | Returns server status verification. |

---

## 💻 Local Quickstart

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on `localhost:27017`)

### 1. Setup the Backend
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (Optional—defaults to local database and fallback secrets if unconfigured):
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/chamakalatravels
   JWT_SECRET=your_custom_jwt_secret_key
   ```
4. Seed the default Administrator user:
   ```bash
   node scripts/seedAdmin.js
   ```
   *This seeds a default admin account:* `admin@chamakala.com` | `admin123`.
5. Start the backend developer server:
   ```bash
   npm run dev
   ```

### 2. Setup the Frontend
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite preview dev server:
   ```bash
   npm run dev
   ```
4. Access the web app in your browser at `http://localhost:5173`. Access the Admin panel directly at `/admin` (or click "Login" in the navigation) using your seeded credentials.

---

## 📜 License
This project is licensed under the ISC License. Created for **Chamakkala Travels**.
