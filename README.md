# Role-Based Authentication Full-Stack Application

A full-stack web application with role-based authentication featuring User and Admin roles, built with Next.js, Express, MongoDB, and Mongoose.

## 🚀 Features

- **Role-Based Authentication**: Sign up and login with User or Admin roles
- **Secure Password Storage**: Passwords are hashed using bcrypt
- **JWT Authentication**: Token-based authentication for secure API access
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Modern UI**: Beautiful, responsive design with TailwindCSS
- **Type Safety**: Full TypeScript support for both frontend and backend

## 📋 Tech Stack

### Backend
- **Node.js** with **Express**
- **MongoDB** database with **Mongoose ODM**
- **bcryptjs** for password hashing
- **JWT** (jsonwebtoken) for authentication
- **TypeScript** for type safety

### Frontend
- **Next.js 14** with **App Router**
- **TypeScript**
- **TailwindCSS** for styling
- **react-hook-form** for form handling
- **Axios** for API calls

## 📁 Project Structure

```
Internship_assignment-2/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts        # MongoDB connection
│   │   ├── models/
│   │   │   └── User.ts            # User Mongoose model
│   │   ├── controllers/
│   │   │   └── auth.ts            # Authentication controllers
│   │   ├── middleware/
│   │   │   └── auth.ts            # JWT authentication middleware
│   │   ├── routes/
│   │   │   └── auth.ts            # Authentication routes
│   │   └── server.ts              # Express server
│   ├── env.example                # Environment variables template
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Protected dashboard page
│   │   ├── login/
│   │   │   └── page.tsx           # Login page
│   │   ├── signup/
│   │   │   └── page.tsx           # Signup page with role selection
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home page
│   │   └── globals.css
│   ├── lib/
│   │   └── api.ts                 # API client
│   ├── env.example                # Environment variables template
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database (use MongoDB Atlas free tier or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the `backend` directory with the following:

```env
DATABASE_URL="mongodb://localhost:27017/auth_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

**For MongoDB Atlas (Free Tier):**
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free account and cluster
- Create a database user
- Whitelist your IP address (or use `0.0.0.0/0` for all IPs in development)
- Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/auth_db?retryWrites=true&w=majority`
- Replace `DATABASE_URL` in `.env` with your Atlas connection string

**For Local MongoDB:**
- Install MongoDB locally
- Use: `mongodb://localhost:27017/auth_db`

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### POST `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "USER" // or "ADMIN"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### GET `/auth/me`
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. **Render:**
   - Push your code to GitHub
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install && npm run build`
   - Set start command: `cd backend && npm start`
   - Add environment variables from your `.env` file
   - Deploy

2. **Railway:**
   - Push your code to GitHub
   - Create a new project on Railway
   - Connect your GitHub repository
   - Add MongoDB service (or use MongoDB Atlas)
   - Set environment variables
   - Deploy

3. **Vercel Serverless:**
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to backend directory: `cd backend`
   - Run: `vercel`
   - Configure environment variables

### Frontend Deployment (Vercel/Netlify)

1. **Vercel:**
   - Push your code to GitHub
   - Import project on Vercel
   - Set root directory to `frontend`
   - Add environment variable: `NEXT_PUBLIC_API_URL` (your backend URL)
   - Deploy

2. **Netlify:**
   - Push your code to GitHub
   - Create a new site on Netlify
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm run build`
   - Set publish directory: `frontend/.next`
   - Add environment variable: `NEXT_PUBLIC_API_URL`
   - Deploy

### Environment Variables for Deployment

**Backend (.env):**
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/auth_db?retryWrites=true&w=majority"
JWT_SECRET="your-production-jwt-secret"
PORT=5000
FRONTEND_URL="https://your-frontend-url.vercel.app"
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL="https://your-backend-url.onrender.com"
```

## 🧪 Testing the Application

1. **Sign Up:**
   - Navigate to `/signup`
   - Fill in name, email, password
   - Select role (User or Admin)
   - Submit form

2. **Login:**
   - Navigate to `/login`
   - Enter email and password
   - Submit form

3. **Dashboard:**
   - After login, you'll be redirected to `/dashboard`
   - The dashboard shows: "Welcome, [Name] ([Role])"
   - User and Admin see different content based on their role

## 🔒 Security Features

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens with expiration (7 days)
- Protected API routes with authentication middleware
- CORS configured for frontend origin
- Input validation on both frontend and backend

## 📝 Notes

- The dashboard is a protected route - users must be authenticated to access it
- JWT tokens are stored in localStorage (consider using httpOnly cookies for production)
- The application includes logout functionality
- Form validation is implemented using react-hook-form

## 🎯 Optional Enhancements (Future Work)

- CRUD operations for user-specific items
- Item listing with search and pagination
- Backend and frontend tests (Jest, React Testing Library)
- Data tables with filtering
- Form validation with Zod/Joi
- Different UI layouts for Admin vs User dashboards
- Email verification
- Password reset functionality

## 📄 License

This project is open source and available for portfolio use.

## 👤 Author

Built as part of an internship assignment demonstrating full-stack development skills.

---

**Note:** Remember to update the `DATABASE_URL` and `JWT_SECRET` with your actual production values before deploying!

