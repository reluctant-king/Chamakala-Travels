Chamakkala Travels ✈️ 🌍
A modern, full-stack web application for Chamakkala Travels—a travel agency based in Neendoor, Kottayam, Kerala, India.

The portal facilitates interactive travel plan inquiries and real-time transit fare updates for customers, backed by a secure admin panel for agency operators.

🚀 Key Features
Live Fares Board: Real-time display of the latest promotional flight, train, and bus ticket fares, categorized and sorted by most recent.
Trip Inquiry System: Multi-step planning form allowing users to submit custom destinations, travel classes, passenger counts, budgets, and remarks.
Secure Admin Dashboard: A protected administrative panel for agency staff to:
View, filter, and track customer inquiries.
Manage lead pipelines with status indicators (New, In Progress, Completed).
Publish new live fare deals directly onto the homepage.
Office Map Integration: Animated Google Maps integration pinpointing the agency office on the Ettumanoor – Neendoor Road, Kottayam.
WhatsApp Chat Widget: Floating contact widget linked to the agency's customer care number.
🛠️ Technology Stack
Frontend
React & Vite — High-performance, reactive UI development.
Tailwind CSS — Utility-first styling.
Framer Motion — Smooth micro-animations and entrance transitions.
Lucide React — Consistent iconography.
React Router Dom — Client-side routing.
Backend & Database
Node.js & Express — REST API server architecture.
MongoDB & Mongoose — NoSQL database and Object Data Modeling.
JWT & BcryptJS — Secure authentication and password encryption.
📂 Project Structure
text

Chamakkala-Travels/
├── client/                     # Frontend React project
│   ├── src/
│   │   ├── assets/             # Images and static assets
│   │   ├── components/         # Shared UI components
│   │   ├── layouts/            # Page layout wrappers
│   │   ├── pages/              # Route-level page views
│   │   ├── App.jsx             # Main router configuration
│   │   └── index.css           # Global styles
│   └── package.json
│
├── server/                     # Backend Node.js project
│   ├── middleware/             # Authentication middleware
│   ├── models/                 # Mongoose data schemas
│   ├── routes/                 # Express API route handlers
│   ├── scripts/                # Database utility scripts
│   ├── server.js               # Application entry point
│   └── package.json
│
└── .gitignore
🔗 API Endpoint Reference
All endpoints are prefixed with /api. Protected routes require a valid Bearer <JWT_TOKEN> authorization header.

Method	Endpoint	Access	Purpose
POST	/api/auth/login	Public	Authenticates admin and returns a JWT.
GET	/api/fares	Public	Retrieves all live travel fares.
POST	/api/fares	Admin Only	Adds a new promotional fare.
POST	/api/inquiries	Public	Submits a customer trip inquiry.
GET	/api/inquiries	Admin Only	Fetches all customer inquiries.
PUT	/api/inquiries/:id/status	Admin Only	Updates an inquiry's status.
GET	/api/health	Public	Returns server health status.
💻 Local Setup
Prerequisites
Node.js v18 or higher
MongoDB Community Server running locally
1. Backend Setup
Bash

cd server
npm install
Create a .env file inside the server directory:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/chamakkala-travels
JWT_SECRET=your_jwt_secret_key
Seed the initial admin account:

Bash

node scripts/seedAdmin.js
Start the development server:

Bash

npm run dev
2. Frontend Setup
Bash

cd client
npm install
npm run dev
Visit http://localhost:5173 in your browser.

📜 License
This project is licensed under the ISC License.
Created for Chamakkala Travels, Neendoor, Kottayam, Kerala, India.