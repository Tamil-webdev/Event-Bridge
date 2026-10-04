# Event Bridge

Event Bridge is a full-stack campus engagement platform designed to connect students, clubs, and colleges in one place. It helps colleges and student communities promote events, manage club activities, and keep students informed about upcoming opportunities.

The project solves a very common problem in campus life: event information is usually scattered across WhatsApp groups, posters, social media pages, and club announcements. Event Bridge centralizes that information into a single, structured platform where students can discover events, follow clubs, and register for activities easily.

---

## Objective

The main objective of Event Bridge is to:

- create a digital hub for campus events and student clubs
- make event discovery simple and centralized
- improve communication between clubs and students
- allow clubs to publish updates and event announcements quickly
- help students stay informed about opportunities relevant to their college and district
- make participation in college culture more engaging and organized

---

## Problem It Solves

College students often miss important events because information is fragmented and difficult to track. Clubs may also struggle to reach the right audience, and event promotion is often inefficient.

Event Bridge addresses this by providing:

- a single platform for upcoming events
- club pages with follower and member functionality
- event registration and tracking
- notifications for club activity and new events
- easier access to campus communities across a college or district

This reduces communication gaps and improves student participation in campus activities.

---

## Core Features

- User registration and login with JWT-based authentication
- Role-based user access such as student and club admin
- Club creation, follow, and membership functionality
- Event creation by club admins
- Event registration and unregistration by users
- Search and filtering of upcoming events
- Dashboard with event statistics and nearest-event discovery
- Notifications for club updates and newly published events
- College and district-aware event discovery
- Image upload support for clubs and events

---

## How It Works

The app follows a standard MERN flow:

1. A user signs up or logs in using the frontend.
2. The backend validates the user and returns a JWT token.
3. The frontend stores this token and uses it for protected routes and API requests.
4. Students can browse clubs, follow clubs, and view associated events.
5. Club admins can create clubs and publish events for their community.
6. Users can register for events, and the backend stores their registrations in MongoDB.
7. When a club publishes a new event, followers receive notifications.
8. The dashboard shows upcoming events, relevant events based on district, and personal event data.

In short, the system connects three main entities:

- User
- Club
- Event

with relationships such as:

- user belongs to a college
- club belongs to a college
- club has members and followers
- event belongs to a club and a college
- user can register for many events

---

## Tech Stack Used

### Frontend

- React.js
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS
- dotenv

### Why These Technologies Were Chosen

#### React + Vite
React makes it easier to build a modern, component-based user interface. Vite provides a fast development experience with quick reloads and efficient bundling, which is ideal for a front-end dashboard and event platform.

#### Tailwind CSS
Tailwind helps build a polished, responsive interface quickly without writing excessive custom CSS. It is especially useful for dashboards, cards, landing pages, and event listings.

#### Node.js + Express
Express provides a simple and scalable backend structure for REST APIs. It is efficient for handling authentication, club logic, event operations, and notifications.

#### MongoDB + Mongoose
MongoDB is well-suited for storing flexible data such as users, clubs, events, notifications, and registrations. Mongoose simplifies schema creation, validation, and database relationships.

#### JWT + bcryptjs
JWT is used to manage secure user sessions, while bcrypt ensures passwords are stored securely in hashed form.

#### Multer
This is used for handling image uploads such as club banners or event images.

#### Axios + CORS
Axios simplifies communication between the React frontend and Express backend, while CORS ensures secure cross-origin API access during local development.

---

## Project Structure

```bash
Event_Bridge/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── uploads/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── package-lock.json
```

---

## Main Functional Flow

### 1. Authentication
Users can register and log in. The backend checks for existing users, hashes passwords, and issues a token for subsequent authenticated requests.

### 2. Club Management
A club can be created by an authorized user and linked to a college. Clubs can have members and followers, which allows communities to grow and stay connected.

### 3. Event Publishing
Club admins create events with details such as title, description, date, time, district, and image. These events are then exposed to students for discovery and registration.

### 4. Event Registration
Students can register for events. The system updates both the event's registeredUsers list and the user's registeredEvents list.

### 5. Notifications
When a club publishes a new event, all followers of that club receive a notification message. This keeps users informed even when they do not visit the platform regularly.

### 6. Dashboard Experience
The frontend shows upcoming events, nearest events relevant to a user's district, and member-specific event lists. This makes the platform more personalized.

---

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB running locally or on a cloud instance
- npm package manager

### 1. Clone the project

```bash
git clone <repository-url>
cd Event_Bridge
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/eventbridge
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend will typically run on:

- http://localhost:5173

The backend will run on:

- http://localhost:5000

---

## Future Improvements

Some strong next-step enhancements for this project include:

- admin dashboard for college-level moderation
- event approval workflow
- email and push notifications
- calendar integration
- live updates or real-time chat for clubs
- filters by category, date, and location
- role-specific dashboards for club admins and students

---

## Summary

Event Bridge is a practical solution for connecting students with campus clubs and events. It addresses the communication gap that often exists on college campuses and helps create a more active, informed, and connected student community.

By combining the MERN stack with a user-friendly interface, the project delivers a simple but powerful event and club management system that is useful for real-world campus environments.
